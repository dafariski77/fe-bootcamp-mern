import { Route, Routes } from "react-router-dom";
import DashboardPage from "../pages/dashboard";

export function HomeRoute() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
    </Routes>
  );
}
