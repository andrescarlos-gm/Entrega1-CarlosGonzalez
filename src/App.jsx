import NavBar from "./Components/NavBar/NavBar.jsx";
import ItemListContainer from "./Components/ItemListContainer/ItemListContainer.jsx";
import ItemDetailsContainer from "./Components/ItemDetailsContainer/ItemDetailsContainer.jsx"
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./main.css";
import CartContext, {CartProvider} from "./context/CartContext";


export default function App(cartList, addToCart, removeList, deleteItem) {
  return (
    <BrowserRouter>
      <CartProvider>
      <CssBaseline>
        <NavBar />
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/category/:id" element={<ItemListContainer />} />
          <Route path="/item/:id" element={<ItemDetailsContainer/>} />
          <Route path="*" element={<>404</>} />
        </Routes>
      </CssBaseline>
      </CartProvider>
    </BrowserRouter>
  );
}
