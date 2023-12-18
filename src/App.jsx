import NavBar from "./Components/NavBar/NavBar.jsx";
import NotFound from "./Components/404/404.jsx";
import ItemListContainer from "./Components/ItemListContainer/ItemListContainer.jsx";
import ItemDetailContainer from "./Components/ItemDetailContainer/ItemDetailContainer.jsx"
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./main.css";
import CartContainer from "./Components/CartContainer/CartContainer.jsx";
import { CartProvider } from "./context/CartContext.jsx";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBD6BvJXJwyVIHdUBYnVurzYswUxYFvSzw",
  authDomain: "parallax-humanoid.firebaseapp.com",
  projectId: "parallax-humanoid",
  storageBucket: "parallax-humanoid.appspot.com",
  messagingSenderId: "732705533260",
  appId: "1:732705533260:web:99cb031f23ecad05a1b3e9"
};

// Initialize Firebase
initializeApp(firebaseConfig);



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
        </Routes>
        </CartProvider>
      </CssBaseline>
    </BrowserRouter>
  );
}

export default App;
