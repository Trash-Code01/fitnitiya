import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

// Pages
import Home from "../pages/Home";
 import About from "../pages/About";
import Contact from "../pages/contact";
import Booking from "../pages/Booking";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* All main pages wrapped with layout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
           <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="booking" element={<Booking />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
