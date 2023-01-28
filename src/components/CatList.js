import { forwardRef, useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutlined, Edit } from "@mui/icons-material";
import { deleteCat, getCats } from "../redux/apiCalls";
import { Box } from "@mui/system";
import QuickSearchToolbar from "../utils/QuickSearchToolbar";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CatList() {
  const [cats, setCats] = useState(false);
  const [deleteCatId, setDeleteCatId] = useState(false);

  useEffect(() => {
    getCats().then((res) => setCats(res.data));
  }, []);

  const handleDelete = (id) => {
    setDeleteCatId(false);
    deleteCat(id).then(() => getCats().then((res) => setCats(res.data)));
  };

  const handleCloseDialog = () => {
    setDeleteCatId(false);
  };

  const columns = [
    {
      field: "_id",
      headerClassName: "super-app-theme--header",
      headerName: "Category ID",
      width: 200,
      editable: false,
    },
    {
      field: "label",
      headerClassName: "super-app-theme--header",
      headerName: "Label",
      width: 350,
      renderCell: (params) => {
        return (
          <Stack direction="row" alignItems="center" sx={{ gap: 2 }}>
            <Avatar
              src={
                params.row.img
                  ? params.row.img
                  : "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg?w=740&t=st=1659084544~exp=1659085144~hmac=a3824a2d031223455bf32fd92c96c6bb01cee188ad48fb61c8611e702c8b75bb"
              }
              alt=""
            />
            <Typography>{params.row.label}</Typography>
          </Stack>
        );
      },
    },
    {
      field: "desc",
      headerClassName: "super-app-theme--header",
      headerName: "Description",
      width: 500,
      editable: true,
    },
    {
      field: "action",
      headerClassName: "super-app-theme--header",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <Stack direction="row" alignItems="center" sx={{ gap: 2 }}>
            <Link
              to={"/category/" + params.row._id}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <IconButton aria-label="edit">
                <Edit />
              </IconButton>
            </Link>
            <IconButton
              disabled={params.row.isAdmin === true}
              aria-label="delete"
              onClick={() => setDeleteCatId(params.row._id)}
            >
              <DeleteOutlined />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }} disableGutters>
      <Box
        sx={{
          height: 500,
          width: "100%",
          "& .super-app-theme--header": {
            backgroundColor: "#2263a5",
            borderLeftWidth: 1,
            borderColor: "#f1f8ff",
            color: "white",
          },
        }}
      >
        <DataGrid
          headerHeight={30}
          loading={!cats.length}
          rows={cats}
          getRowId={(row) => row._id}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          density="comfortable"
          initialState={{
            sorting: {
              sortModel: [{ field: "label", sort: "asc" }],
            },
          }}
          components={{ Toolbar: QuickSearchToolbar }}
        />
      </Box>
      <Dialog
        open={Boolean(deleteCatId)}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            If you proceed now category with ID {deleteCatId} will be erased.
            This action is irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={() => handleDelete(deleteCatId)}>Proceed</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
