import {
  loginFailure,
  loginStart,
  loginSuccess,
  getUserStart,
  getUserSuccess,
  getUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  addUserStart,
  addUserSuccess,
  addUserFailure,
} from "./userRedux";
import {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
} from "./productRedux";
import axios from "axios";

axios.defaults.withCredentials = true; //so its can set automatically the cookie i want
axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000/api"
    : "https://bestmart-admin.vercel.app/api";

//Notifications
export const getNotifications = async () => {
  try {
    const res = await axios.get(`/notifications?SORTBY=CREATEDAT`);
    return res;
  } catch (err) {
    return err;
  }
};

export const sendNotification = async (notification) => {
  try {
    const res = await axios.post(`/notifications`, notification);
    return res;
  } catch (err) {
    return err;
  }
};

export const deleteNotification = async (notificationId) => {
  try {
    const res = await axios.delete(`/notifications/${notificationId}`);
    return res;
  } catch (err) {
    return err;
  }
};

//Users
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/auth/login", user);
    res.data.accountType === 3 && dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
    return { result: "error", message: err };
  } finally {
    return { result: "error", message: "Failed to authenticate." };
  }
};

export const getUsers = async (dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await axios.get("/users?sortBy=createdAt");
    dispatch(getUserSuccess(res.data));
    return res.data;
  } catch (err) {
    dispatch(getUserFailure());
    return err;
  }
};

export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserStart());
  try {
    await axios.delete(`/users/${id}`);
    dispatch(deleteUserSuccess({ id: id }));
  } catch (err) {
    dispatch(deleteUserFailure());
  }
};

export const updateUser = async (id, user, dispatch) => {
  dispatch(updateUserStart());
  try {
    // update
    const res = await axios.put(`/users/${id}`, user);
    dispatch(updateUserSuccess({ id, user }));
    return res;
  } catch (err) {
    dispatch(updateUserFailure());
    return err;
  }
};

export const addUser = async (user, dispatch) => {
  dispatch(addUserStart());
  try {
    const res = await axios.post(`/auth/register`, user);
    dispatch(addUserSuccess(res.data.data));
    return res;
  } catch (err) {
    dispatch(addUserFailure());
    return err;
  }
};

//Products
export const getProduct = async (id) => {
  try {
    const res = await axios.get(`/products/find/${id}`);
    return res;
  } catch (err) {
    return err;
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await axios.get("/products?new=true");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    await axios.delete(`/products/${id}`);
    dispatch(deleteProductSuccess({ id: id }));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    // update
    const res = await axios.put(`/products/${id}`, product);
    dispatch(updateProductSuccess({ id, product }));
    return res;
  } catch (err) {
    dispatch(updateProductFailure());
    return err;
  }
};

export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await axios.post(`/products`, product);
    dispatch(addProductSuccess(res.data.data));
    return res;
  } catch (err) {
    dispatch(addProductFailure());
    return err;
  }
};

//Orders
export const getOrder = async (id) => {
  try {
    const res = await axios.get(`/orders/order/${id}`);
    return res;
  } catch (err) {
    return err;
  }
};

export const getOrders = async () => {
  try {
    const res = await axios.get(`/orders/all`);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const deleteOrder = async (id) => {
  try {
    const res = await axios.delete(`/orders/${id}`);
    return res;
  } catch (err) {
    return err;
  }
};

export const updateOrder = async (id, order) => {
  try {
    // update
    const res = await axios.put(`/orders/${id}`, order);
    return res;
  } catch (err) {
    return err;
  }
};

//Reviews
export const getReviews = async () => {
  try {
    const res = await axios.get(`/reviews/all`);
    return res.data;
  } catch (err) {
    return err;
  }
};
export const deleteReview = async (id) => {
  try {
    const res = await axios.delete(`/reviews/${id}`);
    return { result: "success", message: res.data };
  } catch (err) {
    return { result: "error", message: err };
  }
};
export const approveReview = async (id) => {
  try {
    const res = await axios.post(`/reviews/approve/${id}`);
    return { result: "success", message: res.data };
  } catch (err) {
    return { result: "error", message: err };
  }
};
export const disapproveReview = async (id) => {
  try {
    const res = await axios.post(`/reviews/disapprove/${id}`);
    return { result: "success", message: res.data };
  } catch (err) {
    return { result: "error", message: err };
  }
};

//Categories

export const addCat = async (category) => {
  try {
    const res = await axios.post(`/categories`, category);
    return res;
  } catch (err) {
    return err;
  }
};

export const getCat = async (id) => {
  try {
    const res = await axios.get(`/categories/find/${id}`);
    return res;
  } catch (err) {
    return err;
  }
};

export const getCats = async () => {
  try {
    const res = await axios.get(`/categories?sortBy=createdAt`);
    return res;
  } catch (err) {
    return err;
  }
};

export const deleteCat = async (id) => {
  try {
    const res = await axios.delete(`/categories/${id}`);
    return res;
  } catch (err) {
    return err;
  }
};

export const updateCat = async (id, cat) => {
  try {
    // update
    const res = await axios.put(`/categories/${id}`, cat);
    return res;
  } catch (err) {
    return err;
  }
};

export const logout = async () => {
  await axios.get("/auth/logout");
  window.localStorage.clear();
  window.location = "/login";
};

//Dashboard
export const getUserStatistics = async () => {
  try {
    const chart = await axios.get("/users/stats");
    return chart.data;
  } catch (err) {
    return err;
  }
};
export const countSeller = async () => {
  try {
    const c = await axios.get("/users/countSeller");
    return c.data;
  } catch (err) {
    return err;
  }
};
export const countCustomer = async () => {
  try {
    const c = await axios.get("/users/countUser");
    return c.data;
  } catch (err) {
    return err;
  }
};

export const countCategory = async () => {
  try {
    const c = await axios.get("/categories/countCategory");
    return c.data;
  } catch (err) {
    return err;
  }
};
export const countProduct = async () => {
  try {
    const c = await axios.get("/products/countProduct/all");
    return c.data;
  } catch (err) {
    return err;
  }
};

export const countReview = async () => {
  try {
    const c = await axios.get("/reviews/countReview");
    return c.data;
  } catch (err) {
    return err;
  }
};

export const countOrder = async () => {
  try {
    const c = await axios.get("/orders/countOrder");
    return c.data;
  } catch (err) {
    return err;
  }
};

export const countQuestion = async () => {
  try {
    const c = await axios.get("/questions/countQuestion");
    return c.data;
  } catch (err) {
    return err;
  }
};
