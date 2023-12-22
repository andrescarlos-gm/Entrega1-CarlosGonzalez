import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { FormHelperText, Snackbar } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [EmailError, setEmailError] = useState({
    error: false,
    message: "",
  });
  const [loginError, setLoginError] = useState("");
  const [open, setOpen] = useState(false);
  
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const EmailValidation = (email) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(email);
  };
  const handleEmailError = (email) => {
    if (!EmailValidation(email) && email !== "") {
      setEmailError({
        error: true,
        message: "Invalid email address",
      });
    } else {
      setEmailError({
        error: false,
        message: "",
      });
    }
  };
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      localStorage.setItem("token", user.accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      handleClick()
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      setLoginError( "Invalid email address or password");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Welcome Again
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            onBlur={(e) => handleEmailError(e.target.value)}
            value={email}
            autoComplete="email"
            error={EmailError.error}
            helperText={EmailError.message}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}

          <FormHelperText id="my-helper-text" sx={{color: "red"}}>{loginError}</FormHelperText>

          <Button
            type="login"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!EmailValidation(email) || !password}
          >
            Login
          </Button>
          <Snackbar
            open={open}
            onClose={handleClose}
            message={`Welcome Back ${email}`}
          />
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>

            <Grid item>
              <Link as={NavLink} to={"/signup"}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
