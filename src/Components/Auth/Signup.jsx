import Button from "@mui/material/Button";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [EmailError, setEmailError] = useState({
    error: false,
    message: "",
  });
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [password1Error, setPassword1Error] = useState({
    error: false,
    message: "",
  });
  const [password2Error, setPassword2Error] = useState({
    error: false,
    message: "",
  });
  const navigate = useNavigate("/");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password1
      );
      const user = userCredential.user;
      localStorage.setItem("token", user.accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      navigate;
    } catch (error) {
      console.error(error);
    }
  };

  const EmailValidation = (email) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(email);
  };
  const handleEmailError = (email) => {
    if (email !== "" && !EmailValidation(email)) {
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

  const PasswordValidation = (password) => {
    const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
    console.log(regex.test(password));
    return regex.test(password);
  };
  const handlePassword1Validation = (password) => {
    if (!PasswordValidation(password1) && password !== "") {
      setPassword1Error({
        error: true,
        message:
          "Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long.",
      });
    }
  };
  const handlePassword2Validation = () => {
    if (password2 !== password1) {
      setPassword2Error({
        error: true,
        message: "Passwords must match",
      });
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
          Sign up
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
            onChange={(e) => setPassword1(e.target.value)}
            onBlur={(e) => handlePassword1Validation(e.target.value)}
            value={password1}
            label="Password"
            type="password"
            error={password1Error.error}
            helperText={password1Error.message}
            id="password"
            autoComplete="current-password"
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmpassword"
            onChange={(e) => setPassword2(e.target.value)}
            onBlur={(e) => handlePassword2Validation(e.target.value)}
            value={password2}
            label="Confirm Password"
            type="password"
            error={password2Error.error}
            helperText={password2Error.message}
            id="confirmpassword"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link as={NavLink} to={"/login"}>
                {"Already registered? Login"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
