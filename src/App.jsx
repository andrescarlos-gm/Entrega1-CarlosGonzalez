import NavBar from "./Components/NavBar/NavBar.jsx";
import ItemListContainer from "./Components/ItemListContainer/ItemListContainer.jsx";
import ItemDetailsContainer from "./Components/ItemDetailsContainer/ItemDetailsContainer.jsx"
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./main.css";
import CartContainer from "./Components/CartContainer/CartContainer.jsx";
import { CartProvider } from "./context/CartContext.jsx";

function App() {
  return (
    <BrowserRouter>
      <CssBaseline>
        <CartProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/category/:id" element={<ItemListContainer />} />
          <Route path="/item/:id" element={<ItemDetailsContainer/>} />
          <Route path="*" element={<>404</>} />
          <Route path="/cart" element={<CartContainer />} />
        </Routes>
        </CartProvider>
      </CssBaseline>
    </BrowserRouter>
  );
}

export default App;