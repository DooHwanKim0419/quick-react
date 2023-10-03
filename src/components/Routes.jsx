import { Routes, Route } from "react-router-dom";
import CourseForm from "./CourseForm";
import MainComponent from "./MainComponent";

const RoutesBase = () => (
  <Routes>
    <Route path="/" element={<MainComponent />} />
    <Route path="/course/edit/:id" element={<CourseForm />} />
  </Routes>
);

export default RoutesBase;
