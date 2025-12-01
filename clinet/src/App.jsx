import React from "react";
import '@mantine/core/styles.css';
import { Route , Routes } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Prefencer from "./pages/Prefencre.jsx";

function App() {
  return (
    <div>
      <Navbar />
      <Prefencer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}
export default App;
