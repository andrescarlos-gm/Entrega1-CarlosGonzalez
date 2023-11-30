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
    const existingProductIndex = cartList.findIndex((item) => item.id === product.id);
    if (existingProductIndex !== -1) {
      const updatedCart = [...cartList];
      updatedCart[existingProductIndex].quantity += product.quantity;
      setCartList(updatedCart);
    }
    else{ const newCartItem = {
        ...product,
        uniqueIdentifier: `${product.id}`,
        quantity: product.quantity,
      };
      setCartList([...cartList, newCartItem]);
    }
  };
  useEffect(() => {
    // Guarda el estado del carrito en localStorage cada vez que cambie
    localStorage.setItem("cartProducts", JSON.stringify(cartList));
  }, [cartList]);

  console.log(cartList)

  return (
    <CartContext.Provider value={{ addToCart}}>
      {children}
    </CartContext.Provider>
  );
};
export default CartContext;
