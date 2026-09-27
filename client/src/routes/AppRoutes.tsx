import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

import Home from "../pages/marketplace/Home";
import Browse from "../pages/marketplace/Browse";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Profile from "../pages/profile/Profile";
import Dashboard from "../pages/profile/Dashboard";
import AddItem from "../pages/listings/AddItem";
import ProductDetails from "../pages/listings/ProductDetails";
import RequestsBoard from "../pages/requests/RequestsBoard";
import Conversations from "../pages/chat/Conversations";
import AdminDashboard from "../pages/admin/AdminDashboard";

// DEV NOTE: keep this file lean — each dev adds their own routes here and only here.
const AppRoutes = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/listing/:id" element={<ProductDetails />} />
      <Route path="/requests" element={<RequestsBoard />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-item" element={<AddItem />} />
        <Route path="/chat" element={<Conversations />} />
      </Route>
    </Route>

    <Route element={<AdminRoute />}>
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>
    </Route>
  </Routes>
);

export default AppRoutes;
