import React from "react";
import {
  BrowserRouter as Router,
  Routes as RouterRoutes,
  Route,
} from "react-router-dom";

import { HomePage } from "../pages/main";
import { LoginPage } from "../pages/login";
import { UserDashboard } from "../pages/userDashboard";
import { FirebaseContextProvider } from "../context/firebaseContext";
import { SignPage } from "../pages/signup";
import { MoviesContextProvider } from "../context/moviesContext";

export const Routes = () => {
  return (
    <FirebaseContextProvider>
      <MoviesContextProvider>
        <Router>
          <RouterRoutes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignPage />} />
            <Route path="/dashboard" element={<UserDashboard />} />
          </RouterRoutes>
        </Router>
      </MoviesContextProvider>
    </FirebaseContextProvider>
  );
};
