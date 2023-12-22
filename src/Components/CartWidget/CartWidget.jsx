import { useContext, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import CartContext from "../../context/CartContext";
import "./CartWidget.css";
import { Button, MenuItem, Menu, Typography, Container, Snackbar } from "@mui/material";
import ManageAccountsTwoToneIcon from "@mui/icons-material/ManageAccountsTwoTone";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import { auth } from "../../../firebase";
import { signOut } from "firebase/auth";

export default function CartWidget() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [opensnack, setOpenSnack] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickSnack = () => {
    setOpenSnack(true);
  };

  const handleCloseSnack = () => {
    setOpenSnack(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  const handleLogout = async () =>{

    await signOut(auth)
    handleClickSnack()
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAnchorEl(null);
    navigate("/")
  }
  const { cartList } = useContext(CartContext);
  const reduce = cartList.reduce((acc, act) => acc + act.quantity, 0);
  return (
    <div>
      <div className="profile">
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <ManageAccountsTwoToneIcon
            sx={{
              scale: "2.3",
              borderLeft: "0.05em",
              color: "#3F3F3F",
              paddingBottom: 0.8,
              paddingLeft: 1,
            }}
          />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
{
  user && (
    <Container>
      <Typography padding={"22px"} style={{fontWeight: 600}}>Hello, {user.email}</Typography>
      <MenuItem onClick={handleClose}>Profile</MenuItem>
      <MenuItem onClick={handleClose}>My account</MenuItem>
      <MenuItem component={Link} to="/" onClick={handleLogout}>
        Log Out
      </MenuItem>

    </Container>
  ) || (
    <Container>
      <MenuItem component={Link} to="/login" onClick={handleClose}>
        Log in
      </MenuItem>
      <MenuItem component={Link} to="/signup" onClick={handleClose}>
        Sign up
      </MenuItem>

    </Container>
  )
}
        
        
        </Menu>
      </div>

      <Link as={NavLink} to={`/Wishlist`}>
        <div className="heart">
          <FavoriteTwoToneIcon sx={{ scale: "1.3", borderLeft: "0.05em" }} />
        </div>
      </Link>

      <Link as={NavLink} to={`/cart`}>
        <div className="cart">
          <ShoppingCartTwoToneIcon
            sx={{ scale: "1.5", borderLeft: "0.05em" }}
          />
          <div className="centred">
            <span className="circle">{reduce}</span>
          </div>
        </div>
      </Link>
      <Snackbar
            open={opensnack}
            onClose={handleCloseSnack}
            autoHideDuration={5000} 
            message="Logging Out"
          />
    </div>
  );
}
