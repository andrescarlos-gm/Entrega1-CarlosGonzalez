import NavBar from "./Components/NavBar/NavBar.jsx";
import NotFound from "./Components/404/404.jsx";
import ItemListContainer from "./Components/ItemListContainer/ItemListContainer.jsx";
import ItemDetailContainer from "./Components/ItemDetailContainer/ItemDetailContainer.jsx"
import Login from "./Components/Auth/Login.jsx";
import Signup from "./Components/Auth/Signup.jsx";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./main.css";
import CartContainer from "./Components/CartContainer/CartContainer.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import Wishlist from "./Components/Wishlist/Wishlist.jsx";
function App() {
  return (
    <BrowserRouter>
      <CssBaseline>
        <CartProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/category/:id" element={<ItemListContainer />} />
          <Route path="/item/:id" element={<ItemDetailContainer/>} />
          <Route path="*" element={<NotFound />} />
          <Route path="/cart" element={<CartContainer  />} />
          <Route path="/signup" element={<Signup  />} />
          <Route path="/login" element={<Login  />} />
          <Route path="/wishlist" element={<Wishlist  />} />
        </Routes>
        </CartProvider>
      </CssBaseline>
    </BrowserRouter>
  );
}

export default App;
