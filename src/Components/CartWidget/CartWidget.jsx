import { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import CartContext from "../../context/CartContext";
import "./CartWidget.css";
import { Button, Typography, MenuList, MenuItem, Menu } from "@mui/material";
import ManageAccountsTwoToneIcon from "@mui/icons-material/ManageAccountsTwoTone";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
export default function CartWidget() {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
              paddingLeft: 1 
            }}
            className="iconUser"
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
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </div>

      <Link as={NavLink} to={`/cart`}>
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
    </div>
  );
}
