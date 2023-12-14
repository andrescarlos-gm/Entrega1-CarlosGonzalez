import {Container, Box, Typography} from "@mui/material/Container";
import logo from "../../images/logos.png";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "primary.main",
        color: "black",
        p: 3,
        mt: "auto", // This will push the footer to the bottom of the page
      }}
    >
      <Container maxWidth="md" align="center">
        <div>
          <p className="text1">
            Trusted by industry-leading organizations around the world
          </p>
          <img className="logos" src={logo} />
        </div>
        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} parallax_Humanoid | All rights reserved |{" "}
          <a href="https://github.com/andrescarlos-gm">Github</a>
        </Typography>
      </Container>
    </Box>
  );
}
