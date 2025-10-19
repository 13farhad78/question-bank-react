// src/Routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Layout from "../Layout";
import Dashboard from "../pages/Dashboard";
import AddQuestionPage from "../pages/AddQuestionPage";
import SavedQuestionsPage from "../pages/SavedQuestionsPage";
import SettingsPage from "../pages/SettingsPage";

export default function AppRoutes() {
  return (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Dashboard/>} />
      <Route path="add-question" element={<AddQuestionPage />} />
      <Route path="saved-questions" element={<SavedQuestionsPage />} />
      <Route path="settings" element={<SettingsPage />} />
    </Route>
  </Routes>
  );
}
