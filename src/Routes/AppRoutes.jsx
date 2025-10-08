// src/Routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AddQuestion from "../pages/AddQuestion";
import SavedQuestion from "../pages/SavedQuestion";
import PracticePage from "../pages/practicePage";
import Layout from "../Layout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="add" element={<AddQuestion />} />
        <Route path="saved" element={<SavedQuestion />} />
        <Route path="practice" element={<PracticePage />} />
      </Route>
    </Routes>
  );
}
