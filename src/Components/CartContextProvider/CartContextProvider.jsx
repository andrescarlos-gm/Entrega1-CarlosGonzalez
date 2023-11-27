import { createContext, useState } from "react";
export const CartContext = createContext();
const CartContextProvider = ({ children }) => {
    const [cartList, setCartList] = useState([]);
    const addToCart = (item, qty) => {  //implementa la funcionalidad para agregar un producto al carrito
    }
    const removeList = () => {	//implementa la funcionalidad para dejar el carrito vacío
    }
    const deleteItem = (id) => {	//implementa la funcionalidad para borrar un producto del carrito
    }
    return (
        <CartContext.Provider value={{cartList, addToCart, removeList, deleteItem}}>
            { children }
        </CartContext.Provider>
    );
}
export default CartContextProvider;


// Crear un contexto para comunicar componentes
