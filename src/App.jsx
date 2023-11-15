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
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/category/:id" element={<ItemListContainer />} />
          <Route path="/item/:id" element={<>😇</>} />
          <Route path="*" element={<>404</>} />
        </Routes>
        
      </CssBaseline>
    </BrowserRouter>
  );
}
