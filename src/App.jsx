import NavBar from "./Components/NavBar/NavBar.jsx";
import ItemListContainer from "./Components/ItemListContainer/ItemListContainer.jsx";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./main.css";

export default function App() {
  return (
    <BrowserRouter>
      <CssBaseline>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <ItemListContainer greeting="Transform your life with a super A+ robot assistant" />
        </Routes>
        
      </CssBaseline>
    </BrowserRouter>
  );
}
