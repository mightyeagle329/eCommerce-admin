import { forwardRef, useEffect, useState } from "react";
import {
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
  Link,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutlined, Edit } from "@mui/icons-material";
import { deleteReview, getReviews } from "../redux/apiCalls";
import QuickSearchToolbar from "../utils/QuickSearchToolbar";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ReviewList() {
  const [reviews, setReviews] = useState(false);
  const [deleteReviewId, setDeleteReviewId] = useState(false);

  useEffect(() => {
    getReviews().then((res) => setReviews(res));
  }, []);

  const handleDelete = (id) => {
    setDeleteReviewId(false);
    deleteReview(id).then(() => getReviews().then((res) => setReviews(res)));
  };

  const handleCloseDialog = () => {
    setDeleteReviewId(false);
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
        return <Typography>{params.row.rating}</Typography>;
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
          <Button onClick={() => handleDelete(deleteReviewId)}>Proceed</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
