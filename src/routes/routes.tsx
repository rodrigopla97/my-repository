import { BrowserRouter, Route, Routes } from "react-router-dom";
import CurriculumPage from "./curriculum/curriculumPage";
import HeaderInterface from "../components/interfaces/headerInterface";
import MainPage from "./main/mainPage";
import ContactPage from "./contact/contactPage";

export default function RoutesProvider() {
  return (
    <BrowserRouter>
      <HeaderInterface />
      <div className="bg-gray-100 min-h-screen">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/curriculum" element={<CurriculumPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
