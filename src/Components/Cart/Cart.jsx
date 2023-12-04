import CartContext from "../../context/CartContext";
import { useContext } from "react";
import { Button, Container } from "@mui/material";
import * as React from "react";
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

  const { cartList } = useContext(CartContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { removeList } = useContext(CartContext);
  const calculateTotal = (items) =>
    items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  function currencyFormat(num) {
    return "$ " + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  const handleRemove = () => {
    removeList()
  }


  return (
    <div>
      <Button size="medium" color="primary" variant="contained"   onClick={handleOpen}>View Cart</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Your products in Cart
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {cartList.length === 0 ? <p>No items in cart.</p> : null}
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={3}>
                    Details
                  </TableCell>
                  <TableCell align="right">Price</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Unit</TableCell>
                  <TableCell align="right">Sum</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartList.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
                    <TableCell align="right">{currencyFormat(row.price)}</TableCell>
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
                    {currencyFormat(calculateTotal(cartList) +
                      calculateTotal(cartList) * TAX_RATE)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Container>
          <Button
          size="medium"
          color="primary"
          variant="contained"
          onClick={handleRemove}
        >          Clear Cart
        </Button>
        <Button
          size="medium"
          color="secondary"
          variant="contained"
        >          Proceed to Checkout
        </Button>
        </Container>
        </Box>
      </Modal>
    </div>
  );
};

export default Cart;
