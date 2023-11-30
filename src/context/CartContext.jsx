import { createContext, useState, useEffect } from "react";
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartList, setCartList] = useState(() => {
    try {
      const productosEnLocalStorage = localStorage.getItem("cartProducts");
      return productosEnLocalStorage ? JSON.parse(productosEnLocalStorage) : [];
    } catch (error) {
      return [];
    }
  });
  const addToCart = (product) => {
    console.log(typeof(product.id))
    const existingProductIndex = cartList.findIndex((item) => parseInt(item.id));
    if (existingProductIndex !== -1) {
      const updatedCart = [...cartList];
      console.log(updatedCart)
      updatedCart[existingProductIndex].quantity += product.quantity;
      setCartList(updatedCart);
    } else {
      setCartList([...cartList, product]);
    }
  };
  useEffect(() => {
    // Guarda el estado del carrito en localStorage cada vez que cambie
    localStorage.setItem("cartProducts", JSON.stringify(cartList));
  }, [cartList]);


  return (
    <CartContext.Provider value={{ addToCart}}>
      {children}
    </CartContext.Provider>
  );
};
export default CartContext;
