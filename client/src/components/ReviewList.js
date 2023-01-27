import { forwardRef, useEffect, useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Rating,
  Slide,
  Snackbar,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  DeleteOutlined,
  Info,
  Unpublished,
  Verified,
} from "@mui/icons-material";
import {
  approveReview,
  deleteReview,
  disapproveReview,
  getReviews,
} from "../redux/apiCalls";
import QuickSearchToolbar from "../utils/QuickSearchToolbar";
import { Link } from "react-router-dom";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

export default function ReviewList() {
  const [reviews, setReviews] = useState(false);
  const [deleteReviewId, setDeleteReviewId] = useState(false);
  const [approveReviewId, setApproveReviewId] = useState(false);
  const [disapproveReviewId, setDisapproveReviewId] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(false);

  useEffect(() => {
    getReviews().then((res) => setReviews(res));
  }, []);

  const handleDelete = () => {
    setLoading(true);
    deleteReview(deleteReviewId).then((res) => {
      setResponse(res);
      setDeleteReviewId(false);
      getReviews().then((res) => {
        setReviews(res);
        setLoading(false);
      });
    });
  };

  const handleApprove = () => {
    setLoading(true);
    approveReview(approveReviewId).then((res) => {
      setResponse(res);
      setApproveReviewId(false);
      getReviews().then((res) => {
        setReviews(res);
        setLoading(false);
      });
    });
  };

  const handleDisapprove = () => {
    setLoading(true);
    disapproveReview(disapproveReviewId).then((res) => {
      setResponse(res);
      setDisapproveReviewId(false);
      getReviews().then((res) => {
        setReviews(res);
        setLoading(false);
      });
    });
  };

  const handleCloseDialog = () => {
    setDeleteReviewId(false);
    setApproveReviewId(false);
    setDisapproveReviewId(false);
  };

  const columns = [
    {
      field: "createdAt",
      headerName: "Reviewed At",
      headerClassName: "super-app-theme--header",
      width: 245,
      editable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Typography>
            {new Date(params.row.createdAt).toLocaleString()}
          </Typography>
        );
      },
    },
    {
      field: "username",
      headerName: "Username",
      headerClassName: "super-app-theme--header",
      width: 200,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Stack direction="row" alignItems="center" sx={{ gap: 2 }}>
            <Avatar src={params.row.user.img} alt="" />
            <Typography>{params.row.user.username}</Typography>
          </Stack>
        );
      },
    },
    {
      field: "product",
      headerName: "Review For",
      headerClassName: "super-app-theme--header",
      width: 200,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Link
            to={`/product/${params.row.product._id}`}
            style={{ textDecoration: "none" }}
          >
            <Stack direction="row" alignItems="center" sx={{ gap: 2 }}>
              <Avatar src={params.row.product.img} alt="" />
              <Typography>{params.row.product.title}</Typography>
            </Stack>
          </Link>
        );
      },
    },
    {
      field: "title",
      headerName: "Title",
      headerClassName: "super-app-theme--header",
      width: 245,
      editable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <Typography>{params.row.title}</Typography>;
      },
    },
    {
      field: "rating",
      headerName: "Rating",
      headerClassName: "super-app-theme--header",
      width: 245,
      editable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <Rating name="read-only" value={params.row.rating} readOnly />;
      },
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "super-app-theme--header",
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Typography
            sx={{
              color: !params.row.status ? "red" : "green",
            }}
          >
            {params.row.status ? "Approved" : "Awaiting"}
          </Typography>
        );
      },
    },
    {
      field: "message",
      headerName: "Message",
      headerClassName: "super-app-theme--header",
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Box
            sx={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              "&:hover": {
                overflow: "visible",
                whiteSpace: "normal",
                position: "absolute",
              },
            }}
          >
            {params.row.message}
          </Box>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Stack direction="row" alignItems="center" sx={{ gap: 1 }}>
            {!params.row.status && (
              <Tooltip title="Publish">
                <IconButton
                  aria-label="publish"
                  onClick={() => setApproveReviewId(params.row._id)}
                >
                  <Verified />
                </IconButton>
              </Tooltip>
            )}
            {params.row.status && (
              <Tooltip title="Unpublish">
                <IconButton
                  aria-label="Unpublish"
                  onClick={() => setDisapproveReviewId(params.row._id)}
                >
                  <Unpublished />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Delete">
              <IconButton
                aria-label="delete"
                onClick={() => setDeleteReviewId(params.row._id)}
              >
                <DeleteOutlined />
              </IconButton>
            </Tooltip>
            <Link
              to={`/product/${params.row.product._id}`}
              style={{ textDecoration: "none" }}
            >
              <Tooltip title="Visit Product Page">
                <IconButton>
                  <Info />
                </IconButton>
              </Tooltip>
            </Link>
          </Stack>
        );
      },
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }} disableGutters>
      {reviews.length === 0 ? (
        <Typography variant="h6">No review has been placed yet.</Typography>
      ) : (
        <Box
          sx={{
            height: 500,
            width: "100%",
            "& .super-app-theme--header": {
              backgroundColor: "#2263a5",
              breviewLeftWidth: 1,
              breviewColor: "#f1f8ff",
              color: "white",
            },
          }}
        >
          <DataGrid
            headerHeight={30}
            loading={!reviews.length}
            rows={reviews}
            getRowId={(row) => row._id}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
            density="comfortable"
            initialState={{
              sorting: {
                sortModel: [{ field: "createdAt", sort: "desc" }],
              },
            }}
            components={{ Toolbar: QuickSearchToolbar }}
          />
        </Box>
      )}

      {/* Dialog to delete */}
      <Dialog
        open={Boolean(deleteReviewId)}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            If you proceed now review with ID {deleteReviewId} will be erased.
            This action is irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={() => handleDelete(deleteReviewId)}
            disabled={loading}
          >
            {loading ? "Loading.." : "Proceed"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog to approve */}
      <Dialog
        open={Boolean(approveReviewId)}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Confirm Approve"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            If you proceed now review with ID {approveReviewId} will be
            published under product page.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={() => handleApprove()} disabled={loading}>
            {loading ? "Loading.." : "Proceed"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog to disapprove */}
      <Dialog
        open={Boolean(disapproveReviewId)}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Confirm Unpublish"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            If you proceed now review with ID {approveReviewId} will be
            unpublished.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={() => handleDisapprove()} disabled={loading}>
            {loading ? "Loading.." : "Proceed"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Display success or error message */}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={Boolean(response.result === "success")}
        TransitionComponent={SlideTransition}
        autoHideDuration={5000}
        onClose={() => {
          setResponse(false);
        }}
      >
        <Alert
          onClose={() => {
            setResponse(false);
          }}
          severity={response.result}
          sx={{ width: "100%" }}
        >
          {response.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
