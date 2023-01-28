import { forwardRef, useEffect, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  IconButton,
  Slide,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Close } from "@mui/icons-material";
import { deleteOrder, getOrders } from "../redux/apiCalls";
import QuickSearchToolbar from "../utils/QuickSearchToolbar";
import OrderDetails from "./OrderDetails";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function OrderList() {
  const [orders, setOrders] = useState(false);
  const [deleteOrderId, setDeleteOrderId] = useState(false);
  const [orderDetails, setOrderDetails] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    getOrders().then((res) => setOrders(res));
  }, []);

  const handleDelete = (id) => {
    setDeleteOrderId(false);
    deleteOrder(id).then(() => getOrders().then((res) => setOrders(res)));
  };

  const handleCloseModal = () => {
    setShowDetails(false);
    setOrderDetails(false);
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
      headerName: "Order ID",
      width: 250,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "user.username",
      headerName: "User",
      headerClassName: "super-app-theme--header",
      width: 200,
      editable: false,
      headerAlign: "center",
      align: "center",
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
      field: "orderStatus",
      headerClassName: "super-app-theme--header",
      headerName: "Status",
      width: 100,
      editable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Stack direction="row" alignItems="center" sx={{ gap: 2 }}>
            <Typography
              sx={{
                color:
                  params.row.orderStatus === "pending"
                    ? "blue"
                    : params.row.orderStatus === "cancelled"
                    ? "red"
                    : "green",
              }}
            >
              {params.row.orderStatus.toUpperCase()}
            </Typography>
          </Stack>
    },
    {
      field: "paymentMethod",
      headerClassName: "super-app-theme--header",
      headerName: "Payment",
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "totalAmount",
      headerClassName: "super-app-theme--header",
      headerName: "Amount",
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      width: 130,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Stack sx={{ alignItems: "center" }}>
            <Button
              variant="body2"
              onClick={() => {
                setShowDetails(true);
                setOrderDetails(params.row);
              }}
            >
              Details
            </Button>
          </Stack>
        );
      },
    },
  ];

  return (
    <>
      {showDetails ? (
        <Dialog
          fullScreen
          open={showDetails}
          onClose={() => handleCloseModal()}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => handleCloseModal()}
                aria-label="close"
              >
                <Close />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Order Details
              </Typography>
            </Toolbar>
          </AppBar>
          <DialogContent>
            <OrderDetails orderDetails={orderDetails} />
          </DialogContent>
        </Dialog>
      ) : (
        <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }} disableGutters>
          {orders.length === 0 ? (
            <Typography variant="h6">No order has been placed yet.</Typography>
          ) : (
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
                loading={!orders.length}
                rows={orders}
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
        </Container>
      )}
    </>
  );
}
