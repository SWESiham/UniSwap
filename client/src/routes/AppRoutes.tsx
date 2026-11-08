import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { AddItem } from "../pages/listings/AddItem";
import { Navbar } from "../components/Navbar";
import { Login } from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";
import { MainLayout } from "../layouts/MainLayout";
import { Home } from "../pages/marketplace/Home";


export const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
              <Route element={<MainLayout />}>
                  <Route path="/" element={<Home/>}></Route>
        <Route path="/add-item" element={<AddItem />} />
              </Route>
      </Routes>
    </>
  );
};
