import React from "react";
import {
  BrowserRouter as Router,
  Routes as RouterRoutes,
  Route,
} from "react-router-dom";

import { HomePage } from "../pages/main";
import { LoginPage } from "../pages/login";
import { UserDashboard } from "../pages/userDashboad";

export const Routes = () => {
  return (
    <Router>
      <RouterRoutes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<UserDashboard />} />
      </RouterRoutes>
    </Router>
  );
};
