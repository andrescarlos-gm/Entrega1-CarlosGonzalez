import { Link, NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import { useState, useEffect } from "react";

import CartWidget from "../CartWidget/CartWidget";

function NavBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const [uniqueCat, setUniqueCat] = useState([]);
  useEffect(() => {
    const url =
      "https://6544295e5a0b4b04436c18e0.mockapi.io/v1/parallaxHumanoid/";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const categories = data.map((item) => item.category);
        const uniqueCat = [...new Set(categories)];
        setUniqueCat(uniqueCat);
      })
      .catch((error) => console.error("Error", error));
  }, []);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <PrecisionManufacturingIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            parallax_Humanoid
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {uniqueCat.map((item) => (
                <MenuItem key={item} onClick={handleCloseNavMenu}>
                  {item}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <PrecisionManufacturingIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <NavLink to="/">
            <Typography
              variant="h5"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              parallax_Humanoid
            </Typography>
          </NavLink>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {uniqueCat.map((item) => (
              <NavLink
                key={item}
                to={`/category/${item}`}
                style={{ marginRight: "8px" }}
                onClick={handleCloseNavMenu}
              >
                {item}
              </NavLink>
            ))}
          </Box>

          {/* Here we insert Shipping Cart */}
          <CartWidget />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
