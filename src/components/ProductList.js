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
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined, Edit } from "@mui/icons-material";
import { deleteProduct, getProducts } from "../redux/apiCalls";
import QuickSearchToolbar from "../utils/QuickSearchToolbar";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const [deleteProductId, setDeleteProductId] = useState(false);

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    setDeleteProductId(false);
    deleteProduct(id, dispatch);
  };

  const handleCloseDialog = () => {
    setDeleteProductId(false);
  };

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
      headerName: "Product ID",
      width: 200,
      editable: false,
    },
    {
      field: "title",
      headerName: "Product",
      headerClassName: "super-app-theme--header",
      width: 350,
      editable: false,
      renderCell: (params) => {
        return (
          <Stack direction="row" alignItems="center" sx={{ gap: 2 }}>
            <Avatar src={params.row.img} alt="" />
            <Typography>{params.row.title}</Typography>
          </Stack>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      headerClassName: "super-app-theme--header",
      width: 150,
      editable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "inStock",
      headerName: "Stock",
      headerClassName: "super-app-theme--header",
      width: 150,
      editable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "seller",
      headerName: "Seller",
      headerClassName: "super-app-theme--header",
      width: 200,
      editable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      width: 150,
      renderCell: (params) => {
        return (
          <Stack direction="row" alignItems="center" sx={{ gap: 2 }}>
            <Link
              to={"/product/" + params.row._id}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <IconButton aria-label="edit">
                <Edit />
              </IconButton>
            </Link>
            <IconButton
              disabled={params.row.isAdmin === true}
              aria-label="delete"
              onClick={() => setDeleteProductId(params.row._id)}
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
          loading={!products.length}
          rows={products}
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

      <Dialog
        open={Boolean(deleteProductId)}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            If you proceed now product with ID {deleteProductId} will be erased.
            This action is irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={() => handleDelete(deleteProductId)}>Proceed</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
