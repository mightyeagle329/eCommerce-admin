import {  Avatar,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";

const OrderDetails = ({ orderDetails }) => {
  const [order, setOrder] = useState(orderDetails);

  let daysPassed =
    (new Date() - new Date(order.updatedAt)) / (1000 * 3600 * 24);

  return (
    <>
      <Container maxWidth="xl" sx={{ pb: 10 }}>
        <Container maxWidth="lg" sx={{}}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            sx={{ marginTop: 2, marginBottom: 2, bgcolor: "white", p: 2 }}
          >
            <Stack direction="column">
              <Typography variant="h6">Order #{order._id}</Typography>
              <Typography variant="caption">
                Placed on {new Date(order.createdAt).toLocaleString()}
              </Typography>
              <Stack>
                {order.orderStatus === "cancelled" ? (
                  `Cancelled : Reason (${order?.orderComment})`
                ) : (
                  <Typography>{order.orderStatus.toUpperCase()}</Typography>
                )}
              </Stack>
            </Stack>
            <Typography variant="body2" sx={{ alignItems: "flex-end" }}>
              Total: <s>৳{order.totalMarketPrice}</s>
              <b>৳{order.totalAmount}</b>
            </Typography>
          </Stack>

          <Paper elevation={1} sx={{ mt: 5, mb: 5, p: 2 }}>
            {order.products.map(
              ({
                productId,
                title,
                img,
                quantity,
                price,
                seller,
                marketPrice,
                hasMerchantReturnPolicy,
              }) => (
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{
                    flexDirection: { xs: "column", sm: "row" },
                    bgcolor: "white",
                  }}
                  key={productId}
                >
                  <Stack direction="row" sx={{ gap: 2, w: "60%" }}>
                    <Avatar
                      src={img}
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: 0,
                        mr: 1,
                      }}
                    />
                    <Stack direction="column">
                      <Link
                        to={`/product/${productId}`}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <Typography
                          sx={{
                            width: 300,
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            fontWeight: 400,
                          }}
                        >
                          {title}
                        </Typography>
                      </Link>
                      <Typography>
                        {hasMerchantReturnPolicy && daysPassed <= 7
                          ? "Return available"
                          : "No warranty available (7 days passed)"}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Typography variant="caption" sx={{ w: "20%" }}>
                    <s>৳{marketPrice}</s> ৳{price}
                  </Typography>
                  <Typography variant="caption" sx={{ w: "20%" }}>
                    Qty: {quantity}
                  </Typography>
                  <Stack direction="column" sx={{ w: "20%" }}>
                    {order.orderStatus.toUpperCase()}
                  </Stack>
                </Stack>
              )
            )}
          </Paper>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ flexDirection: { xs: "column", sm: "row", gap: 2 } }}
          >
            <Stack
              direction="column"
              sx={{ bgcolor: "white", p: 2, width: 300, height: 200 }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                Shipping Information
              </Typography>
              <Typography variant="subtitle2">
                Name: {order.shippingInfo.fullName}
              </Typography>
              <Typography variant="subtitle2">
                Phone Number: {order.shippingInfo.phoneNumber}
              </Typography>
              <Typography variant="subtitle2">
                Division: {order.shippingInfo.division}
              </Typography>
              <Typography variant="subtitle2">
                District: {order.shippingInfo.district}
              </Typography>
              <Typography variant="subtitle2">
                Upazila: {order.shippingInfo.upazila}
              </Typography>
              <Typography variant="subtitle2">
                Street: {order.shippingInfo.street}
              </Typography>
            </Stack>

            <Stack
              direction="column"
              sx={{ bgcolor: "white", p: 2, width: 300, height: 200 }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                Billing Information
              </Typography>
              <Typography variant="subtitle2">
                Name: {order.billingInfo.fullName}
              </Typography>
              <Typography variant="subtitle2">
                Phone Number: {order.billingInfo.phoneNumber}
              </Typography>
              <Typography variant="subtitle2">
                Division: {order.billingInfo.division}
              </Typography>
              <Typography variant="subtitle2">
                District: {order.billingInfo.district}
              </Typography>
              <Typography variant="subtitle2">
                Upazila: {order.billingInfo.upazila}
              </Typography>
              <Typography variant="subtitle2">
                Street: {order.billingInfo.street}
              </Typography>
            </Stack>

            <Stack
              direction="column"
              sx={{ bgcolor: "white", p: 2, width: 300, height: 200 }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                Order Summary
              </Typography>
              <Typography variant="subtitle2">
                Sub Total: ৳ {order.totalAmount}
              </Typography>
              <Typography variant="subtitle2">
                Delivery Charge: ৳ <s>50</s> free
              </Typography>
              <Typography variant="subtitle2">
                Total: ৳ {order.totalAmount}
              </Typography>
              <Typography variant="subtitle2">
                Payment Method: Cash on delivery
              </Typography>
            </Stack>
          </Stack>
        </Container>
      </Container>
    </>
  );
};
export default OrderDetails;
