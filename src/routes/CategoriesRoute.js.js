import { Route, Routes } from "react-router-dom";
import CategoriesPage from "../pages/categories";
import CategoryCreate from "../pages/categories/create";
import CategoryEdit from "../pages/categories/edit";

export function CategoriesRoute() {
  return (
    <Routes>
      <Route path="/" element={<CategoriesPage />} />
      <Route path="/create" element={<CategoryCreate />} />
      <Route path="/edit/:categoryId" element={<CategoryEdit />} />
    </Routes>
  );
}
