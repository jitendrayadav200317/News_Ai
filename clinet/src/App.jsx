import React, { lazy } from "react";
import "@mantine/core/styles.css";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { Suspense } from "react";

import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Preferences from "./pages/Preferences.jsx";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";
import LodingSpnner from "./components/LodingSpnner.jsx";
import PreferencesProct from "./components/PreferencesProct.jsx"


const Home = lazy(() => import("./pages/Home.jsx"));
const Profile = lazy(()=>import("./pages/Profile.jsx"))

function App() {
  return (
    <div>
      <Navbar />
      <Toaster />
      <Suspense fallback={<LodingSpnner />}>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/Profile" element={<Profile />} />

            <Route element={<PreferencesProct />}>
              <Route path="/Preferences" element={<Preferences />} />
            </Route>
            
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Suspense>
    </div>
  );
}
export default App;
