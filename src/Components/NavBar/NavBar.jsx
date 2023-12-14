import { NavLink, Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import { Box } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import { useState, useEffect } from "react";
import CartWidget from "../CartWidget/CartWidget";
import { getFirestore, getDocs, collection } from "firebase/firestore";

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
    const fetchData = async () => {
      try {
        const db = getFirestore();
        const refCollection = collection(db, "parallaxhumanoid");
        const snapshot = await getDocs(refCollection);

        const data = snapshot.docs.map((doc) => doc.data());

        const categories = data.map((item) => item.Category);
        const uniqueCat = [...new Set(categories)];
        setUniqueCat(uniqueCat);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  console.log(uniqueCat);
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NavLink to="/" style={{ textDecoration: "none", color: "black" }}>
            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: "flex",
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                transition: 'color 0.3s',
                textDecoration: "none",
                "&:hover": { color: "grey" },
              }}
            >
              <PrecisionManufacturingIcon
                sx={{ display: { xs: "none", md: "flex" }, mr: 1,   transition: 'color red 0.3s', }}
              />
              parallax_Humanoid
            </Typography>
          </NavLink>

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
            ></Menu>
          </Box>
          <PrecisionManufacturingIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              
            }}
          >
            {uniqueCat.map((item) => (
              <Link
                as={NavLink}
                key={item}
                to={`/category/${item}`}
                style={{
                  marginRight: "8px",
                  textDecoration: "none",
                  color: "black",

                }}
                sx={{}}
                onClick={handleCloseNavMenu}
              >
  <Typography
    type="title"
    color="inherit"
    style={{ borderRight: '0.05em solid black', padding: '0.5em', "&:hover": { color: "grey" } }}
    
  >
    {item}
  </Typography>


                
              </Link>
            ))}
          </Box>
          <CartWidget />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
