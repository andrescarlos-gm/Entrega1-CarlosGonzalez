import NavBar from "./Components/NavBar/NavBar.jsx";
import ItemListContainer from "./Components/ItemListContainer/ItemListContainer.jsx";
import { CssBaseline } from "@mui/material";
import "./main.css";

export default function App() {
  return (
    <CssBaseline>
      <NavBar />
      <ItemListContainer greeting="Transform your life with a super A+ robot assistant" />
    </CssBaseline>
  );
}
