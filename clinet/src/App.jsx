import React from "react";
import "@mantine/core/styles.css";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Prefencer from "./pages/Prefencre.jsx";
import Home from "./pages/Home.jsx";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";

function App() {
  return (
    <div>

      <Navbar />
      <Toaster />
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}
export default App;
