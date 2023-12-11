import CartContext from "../../context/CartContext";
import { useContext } from "react";
import { Button, Container, Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteForever from "@mui/icons-material/DeleteForever";
import CloseIcon from "@mui/icons-material/Close";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
const TAX_RATE = 0.19;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const Cart = () => {
  const { cartList, open, closeModal, removeList, removeItem } =
    useContext(CartContext);

  const calculateTotal = (items) =>
    items.reduce((acc, item) => acc + item.quantity * item.price, 0);

  function currencyFormat(num) {
    return "$ " + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  const handleRemoveList = () => {
    removeList();
  };

  const handleRemoveItem = (id) => {
    removeItem(id);
  };

  const handleClose = () => {
    closeModal();
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <CloseIcon onClick={handleClose} />
          </Box>

          <Typography id="modal-modal-title" variant="h6" component="h2">
            Your products in Cart
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography>
          {cartList.length !== 0 ? (
            <div>
              <TableContainer component={Paper}>
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
    backgroundColor: "grey",
    display: "flex",  // Establecer el display a flex
    justifyContent: "center",  // Centrar horizontalmente
    alignItems: "center",  // Centrar verticalmente
  }}
  noValidate
  autoComplete="off"
>
                <FormControl>
                  <Input id="name" aria-describedby="my-helper-text" label="Filled" variant="filled"   placeholder="Your Name"/>
                  <Input id="lastname" aria-describedby="my-helper-text" label="Filled" variant="filled"  placeholder="Your LastName"/>
                  <Input id="Phone" aria-describedby="my-helper-text" label="Filled" variant="filled"  placeholder="Your Phone number"/>
                  <Input id="mail" aria-describedby="my-helper-text" label="Filled" variant="filled"  placeholder="Email address" />
                  <Input id="mail" aria-describedby="my-helper-text" label="Filled" variant="filled"  placeholder="Email address" />
                  <FormHelperText id="my-helper-text">
                    We'll never share your data.
                  </FormHelperText>
                </FormControl>
              </Box>
              <Container>
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
                  disabled={true}
                >
                  Buy Now
                </Button>
              </Container>
            </div>
          ) : (
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              No items in cart
            </Typography>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Cart;
