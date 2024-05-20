import React from "react";
import { Navbar } from "../components";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="mt-16">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
