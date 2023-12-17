import CartContext from "../../context/CartContext";
import { useContext, useState, useEffect } from "react";
import { Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteForever from "@mui/icons-material/DeleteForever";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";

const TAX_RATE = 0.19;

const style = {
  top: "50%",
  left: "50%",
  direction: "column",
  alignItems: "center",
  justifyContent: "center",
  width: 900,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  overflow: "auto",
};

const Cart = () => {
  const { cartList, removeList, removeItem } = useContext(CartContext);
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [num, setNum] = useState("");
  const [EmailError, setEmailError] = useState({
    error: false,
    message: "",
  });
  const [ConfirmEmailError, setConfirmEmailError] = useState({
    error: false,
    message: "",
  });
  useEffect(() => {
    setTimeout(() => document.documentElement.scrollTo(0, 0), 0);
    console.log("useeffect");
  }, []);

  const calculateTotal = (items) =>
    items.reduce((acc, item) => acc + item.quantity * item.price, 0);

  function currencyFormat(num) {
    return "$ " + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/");
  };

  const handleRemoveList = () => {
    removeList();
    document.documentElement.scrollTo(0, 0);
  };

  const handleRemoveItem = (id) => {
    removeItem(id);
  };

  const handleChange = (e) => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setNum(e.target.value);
    }
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeLastName = (e) => {
    setLastName(e.target.value);
  };

  const EmailValidation = (email) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(email);
  };

  const handleClick = () => {
    const list = cartList.map(function (el) {
      return {
        id: el.id,
        name: el.name,
        unitaryprice: currencyFormat(el.price),
        quantity: el.quantity,
        totalprice: currencyFormat(el.price * el.quantity)
      };
    });

    const order = {
      buyer: {
        name,
        lastname,
        phone: num,
        email,
        date: Date(),
        status: "generated"
      },
      list,
      total: currencyFormat(
        calculateTotal(cartList) + calculateTotal(cartList) * TAX_RATE
      ),
    };

    const db = getFirestore();
    const orderCollection = collection(db, "orders");

    addDoc(orderCollection, order).then(({ id }) => {
      if (id) {
        alert("Your order: " + id + " has been completed!");
        handleRemoveList();
        navigateHome();
      }
    });
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

  const handleConfirmEmailError = (confirmEmail) => {
    if (email !== confirmEmail) {
      setConfirmEmailError({
        error: true,
        message: "Emails do not match",
      });
      if (confirmEmail !== "" && !EmailValidation(email)) {
        setConfirmEmailError({
          error: true,
          message: "Invalid email address",
        });
      }
    } else {
      setConfirmEmailError({
        error: false,
        message: "",
      });
    }
  };

  return (
    <div
      style={{
        marginTop: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 60px)",
        paddingBottom: cartList.length === 0 ? 500 : 100,
      }}
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Your products in Cart
        </Typography>

        <Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography>
        {cartList.length !== 0 ? (
          
          <div>
            <TableContainer component={Paper} sx={{ paddingBottom: 5 }}>
              <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center" colSpan={2}>
                      Details
                    </TableCell>
                    <TableCell align="right">Price</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Unit</TableCell>
                    <TableCell align="right">Sum</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartList.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell>
                        <DeleteForever
                          sx={{ "& :hover": { color: "blue" } }}
                          onClick={() => handleRemoveItem(row.id)}
                        />
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell align="right">{row.quantity}</TableCell>
                      <TableCell align="right">
                        {currencyFormat(row.price)}
                      </TableCell>
                      <TableCell align="right">
                        {currencyFormat(row.quantity * row.price)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell rowSpan={3} />
                    <TableCell colSpan={2}>Subtotal</TableCell>
                    <TableCell align="right">
                      {currencyFormat(calculateTotal(cartList))}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Tax</TableCell>
                    <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                      0
                    )} %`}</TableCell>
                    <TableCell align="right">
                      {currencyFormat(calculateTotal(cartList) * TAX_RATE)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell align="right">
                      {" "}
                      {currencyFormat(
                        calculateTotal(cartList) +
                          calculateTotal(cartList) * TAX_RATE
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Divider />

            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1 },
                backgroundColor: "#dbd9d9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                paddingTop: "40px",
                paddingBottom: "40px",
              }}
              autoComplete="off"
            >
              <FormControl>
                <TextField
                  id="name"
                  label="Your Name"
                  variant="filled"
                  autoFocus
                  onChange={(e) => handleChangeName(e)}
                  value={name}
                  required
                />
              </FormControl>
              <FormControl>
                <TextField
                  id="lastname"
                  label="Your LastName"
                  variant="filled"
                  onChange={(e) => handleChangeLastName(e)}
                  value={lastname}
                  autoFocus
                  required
                />
              </FormControl>
              <FormControl>
                <TextField
                  id="phone"
                  label="Your Phone number"
                  variant="filled"
                  type="text"
                  onChange={(e) => handleChange(e)}
                  value={num}
                  autoFocus
                  required
                />
              </FormControl>
              <FormControl>
                <TextField
                  id="mail"
                  label="Your Email address"
                  variant="filled"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={(e) => handleEmailError(e.target.value)}
                  value={email}
                  autoFocus
                  error={EmailError.error}
                  helperText={EmailError.message}
                  required
                />
              </FormControl>
              <FormControl>
                <TextField
                  id="mail2"
                  label="Repeat Email address"
                  variant="filled"
                  type="email"
                  onChange={(i) => setConfirmEmail(i.target.value)}
                  value={confirmEmail}
                  autoFocus
                  required
                  onBlur={(i) => handleConfirmEmailError(i.target.value)}
                  error={ConfirmEmailError.error}
                  helperText={ConfirmEmailError.message}
                />
                <FormHelperText id="my-helper-text">
                  We&apos;ll never share your data.
                </FormHelperText>
              </FormControl>
            </Box>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                paddingTop: "40px",
              }}
            >
              <Button
                size="medium"
                color="primary"
                variant="contained"
                onClick={handleRemoveList}
              >
                Clear Cart
              </Button>
              <Button
                size="medium"
                color="secondary"
                variant="contained"
                onClick={handleClick}
                disabled={
                  email === "" ||
                  email !== confirmEmail ||
                  !EmailValidation(email) ||
                  !EmailValidation(confirmEmail)
                }
              >
                Buy Now
              </Button>
            </div>
          </div>
        ) : (
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            No items in cart
          </Typography>
        )}
      </Box>
    </div>
  );
};

export default Cart;
