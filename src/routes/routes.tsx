import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./main/mainPage";
import Test from "../components/test";
import Header from "../components/header";
import Curriculum from "./curriculum/curriculumPage";

export default function RoutesProvider() {
  return (
    <BrowserRouter>
        <Header />
        <div className="bg-gray-100 min-h-screen">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/curriculum" element={<Curriculum />} />
            <Route path="/contact" element={<Test />} />
          </Routes>
        </div>      
    </BrowserRouter>
  );
}
