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
import PreferencesProct from "./components/PreferencesProct.jsx";

import Footer from "./components/Footer.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"));
const About = lazy(() => import("./pages/AboutPage.jsx"));
const NewsPage = lazy(() => import("./pages/NewsPage.jsx"));

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
            <Route path="/about" element={<About />} />
            <Route path="/NewsPage" element={<NewsPage />} />

            <Route element={<PreferencesProct />}>
              <Route path="/Preferences" element={<Preferences />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}
export default App;
