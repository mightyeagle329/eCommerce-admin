import {
  Inventory2,
  DashboardSharp,
  People,
  BarChart,
  ShoppingCart,
  Reviews,
  AddBox,
  Category,
  Logout,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
  countCategory,
  countCustomer,
  countOrder,
  countProduct,
  countQuestion,
  countReview,
  countSeller,
  getProducts,
  getUsers,
  getUserStatistics,
  logout,
} from "../redux/apiCalls";
import { useEffect, useMemo, useState } from "react";
import Users from "../components/Users";
import {
  Button,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
} from "@mui/material";
import UserList from "../components/UserList";
import { useLocation, useNavigate, Link } from "react-router-dom";
import ProductList from "../components/ProductList";
import OrderList from "../components/OrderList";
import Notification from "../components/Notification";
import CatList from "../components/CatList";
import ReviewList from "../components/ReviewList";
import UserChart from "../components/UserChart";
import Orders from "../components/Orders";

const drawerWidth = 200;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [nowShowing, setNowShowing] = useState("");
  const [sellerCount, setSellerCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [userStats, setUserStats] = useState([]);

  const [open, setOpen] = useState(false);
  const url = useLocation()?.pathname;
  //Control which screen is displaying
  useEffect(() => {
    url === "/"
      ? setNowShowing("")
      : setNowShowing(url[1].toUpperCase() + url.slice(2));
  }, [url]);

  //Control drawer open or close
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await getUserStatistics();
        res.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ])
        );
      } catch {}
    };
    getStats();
  }, [MONTHS]);

  useEffect(() => {
    const getAllCounts = async () => {
      const promises = [];
      promises.push(countSeller().then((res) => setSellerCount(res)));
      promises.push(countCustomer().then((res) => setCustomerCount(res)));
      promises.push(countProduct().then((res) => setProductCount(res)));
      promises.push(countOrder().then((res) => setOrderCount(res)));
      promises.push(countReview().then((res) => setReviewCount(res)));
      promises.push(countQuestion().then((res) => setQuestionCount(res)));
      promises.push(countCategory().then((res) => setCategoryCount(res)));
      await Promise.all(promises);
    };
    getAllCounts();
  }, []);

  // Get All Users
  useEffect(() => {
    getUsers(dispatch);
    getProducts(dispatch);
  }, [dispatch]);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="absolute"
          open={open}
          sx={{ zIndex: 999, backgroundColor: "#209CEE" }}
        >
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {nowShowing === "" ? "Dashboard" : nowShowing}
            </Typography>

            {nowShowing === "" && (
              <Stack direction="row" alignItems="center" gap={2}>
                <Typography
                  variant="button"
                  sx={{ display: { xs: "none", sm: "block" } }}
                >
                  Welcome Admin
                </Typography>
                <Notification />
                <IconButton onClick={() => logout()}>
                  <Tooltip title="Logout">
                    <Logout fontSize="small" sx={{ color: "white" }} />
                  </Tooltip>
                </IconButton>
              </Stack>
            )}

            {nowShowing === "Users" && (
              <Link to="/user" color="inherit" underline="hover">
                <Button variant="contained" startIcon={<AddBox />}>
                  Add New
                </Button>
              </Link>
            )}

            {nowShowing === "Products" && (
              <Link to="/product" color="inherit" underline="hover">
                <Button variant="contained" startIcon={<AddBox />}>
                  Add New
                </Button>
              </Link>
            )}
            {nowShowing === "Categories" && (
              <Link to="/category" color="inherit" underline="hover">
                <Button variant="contained" startIcon={<AddBox />}>
                  Add New
                </Button>
              </Link>
            )}
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              {open ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <ListItemButton
              onClick={() => navigate("/")}
              selected={nowShowing === ""}
            >
              <ListItemIcon>
                <DashboardSharp />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton
              onClick={() => navigate("/products")}
              selected={nowShowing === "Products"}
            >
              <ListItemIcon>
                <Inventory2 />
              </ListItemIcon>
              <ListItemText primary="Products" />
            </ListItemButton>
            <ListItemButton
              onClick={() => navigate("/users")}
              selected={nowShowing === "Users"}
            >
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItemButton>
            <ListItemButton
              onClick={() => navigate("/orders")}
              selected={nowShowing === "Orders"}
            >
              <ListItemIcon>
                <ShoppingCart />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItemButton>

            <ListItemButton
              onClick={() => navigate("/categories")}
              selected={nowShowing === "Categories"}
            >
              <ListItemIcon>
                <Category />
              </ListItemIcon>
              <ListItemText primary="Categories" />
            </ListItemButton>

            <ListItemButton
              onClick={() => navigate("/reviews")}
              selected={nowShowing === "Reviews"}
            >
              <ListItemIcon>
                <Reviews />
              </ListItemIcon>
              <ListItemText primary="Reviews" />
            </ListItemButton>
          </List>
        </Drawer>
        {nowShowing === "" ? (
          <Box
            component="main"
            sx={{
              width: "100%",
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                {/* Statistics */}
                <Grid item xs={12} md={4} lg={3}>
                  <Box
                    sx={{
                      margin: "20px",
                      padding: "20px",
                      webkitBoxShadow: "0px 0px 15px -10px rgba(0, 0, 0, 0.75)",
                      boxShadow: "0px 0px 15px -10px rgba(0, 0, 0, 0.75)",
                    }}
                  >
                    {/* <Statistics /> */}
                    <Stack direction="column">
                      <Typography variant="h4" sx={{ mb: 2 }}>
                        Statistics
                      </Typography>
                      <Typography variant="caption">
                        Registered Customer: {customerCount}
                      </Typography>
                      <Typography variant="caption">
                        Registered Seller: {sellerCount}
                      </Typography>
                      <Typography variant="caption">
                        Total Categories: {categoryCount}
                      </Typography>
                      <Typography variant="caption">
                        Products Added: {productCount}
                      </Typography>
                      <Typography variant="caption">
                        Orders Made: {orderCount}
                      </Typography>
                      <Typography variant="caption">
                        Reviews: {reviewCount}
                      </Typography>
                      <Typography variant="caption">
                        Question Asked: {questionCount}
                      </Typography>
                    </Stack>
                  </Box>
                </Grid>

                {/* Chart */}
                <Grid item xs={12} md={8} lg={9}>
                  <UserChart
                    data={userStats}
                    title="User Analytics"
                    grid
                    dataKey="Active User"
                  />
                </Grid>

                {/* Last 5 Users */}
                <Grid item xs={12}>
                  <Paper
                    sx={{ p: 2, display: "flex", flexDirection: "column" }}
                  >
                    <Users />
                  </Paper>
                </Grid>

                {/* Last 10 Orders */}
                <Grid item xs={12}>
                  <Paper
                    sx={{ p: 2, display: "flex", flexDirection: "column" }}
                  >
                    <Orders />
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </Box>
        ) : nowShowing === "Users" ? (
          <UserList />
        ) : nowShowing === "Products" ? (
          <ProductList />
        ) : nowShowing === "Orders" ? (
          <OrderList />
        ) : nowShowing === "Categories" ? (
          <CatList />
        ) : nowShowing === "Reviews" ? (
          <ReviewList />
        ) : (
          <Container>
            <Typography sx={{ mt: 10 }} variant="h6">
              The page{" "}
              <span style={{ color: "red", textDecoration: "underline" }}>
                {nowShowing.toLowerCase()}
              </span>{" "}
              you are trying to access is not available yet... maybe there is
              some misspelling...
            </Typography>
          </Container>
        )}
      </Box>
    </ThemeProvider>
  );
}
