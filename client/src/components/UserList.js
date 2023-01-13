import { forwardRef, useEffect, useId, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined, Edit } from "@mui/icons-material";
import { deleteUser, getUsers } from "../redux/apiCalls";
import QuickSearchToolbar from "../utils/QuickSearchToolbar";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UserList() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const [deleteUserId, setDeleteUserId] = useState(false);

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    setDeleteUserId(false);
    deleteUser(id, dispatch);
  };

  const handleCloseDialog = () => {
    setDeleteUserId(false);
  };

  function getFullName(params) {
    return `${params.row.firstName || ""} ${params.row.lastName || ""}`;
  }

  function getAccountType(params) {
    return `${
      params.row.accountType === 0
        ? "Buyer"
        : params.row.accountType === 1
        ? "Seller"
        : "Waiting"
    }`;
  }

  const columns = [
    {
      field: "createdAt",
      headerClassName: "super-app-theme--header",
      headerName: "Created At",
      width: 200,
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
      field: "_id",
      headerClassName: "super-app-theme--header",
      headerName: "User ID",
      width: 250,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "username",
      headerName: "User",
      headerClassName: "super-app-theme--header",
      width: 300,
      editable: false,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Stack direction="row" alignItems="center" sx={{ gap: 2 }}>
            <Avatar src={params.row.img} alt="" />
            <Typography>{params.row.username}</Typography>
          </Stack>
        );
      },
    },
    {
      field: "fullName",
      headerName: "Full Name",
      headerClassName: "super-app-theme--header",
      width: 300,
      editable: false,
      headerAlign: "center",
      valueGetter: getFullName,
    },
    {
      field: "accountType",
      headerName: "Account Type",
      headerClassName: "super-app-theme--header",
      editable: false,
      headerAlign: "center",
      valueGetter: getAccountType,
      width: 200,
    },
    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      width: 150,
      editable: false,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Stack direction="row" alignItems="center" sx={{ gap: 2 }}>
            <Link
              href={"/user/" + params.row._id}
              underline="none"
              color="inherit"
            >
              <IconButton aria-label="edit">
                <Edit />
              </IconButton>
            </Link>
            <IconButton
              disabled={params.row.isAdmin === true}
              aria-label="delete"
              onClick={() => setDeleteUserId(params.row._id)}
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
          loading={!users.length}
          rows={users}
          getRowId={(row) => row._id}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
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

      <Dialog
        open={Boolean(deleteUserId)}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            If you proceed now user with ID {deleteUserId} will be erased. This
            action is irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={() => handleDelete(deleteUserId)}>Proceed</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
