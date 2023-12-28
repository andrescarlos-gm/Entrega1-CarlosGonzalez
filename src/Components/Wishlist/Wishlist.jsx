import { useContext, useEffect, useState } from "react";
import CartContext from "../../context/CartContext.jsx";
import {
  getFirestore,
  query,
  where,
  collection,
  getDocs,
  documentId,
  getDoc,
  doc,
} from "firebase/firestore";
import Item from "../Item/Item.jsx";
import { Grid, Typography } from "@mui/material";
import RingLoader from "react-spinners/RingLoader.js";
export default function Wishlist() {
  const [items, setItems] = useState("");
  const [loading, setLoading] = useState(true);
  const { favs, favList } = useContext(CartContext);
  const user = JSON.parse(localStorage.getItem("user"));
  //Recupera todos los favoritos
  useEffect(() => {
    if (user) {
      const fetchLikes = async () => {
        const db = getFirestore();
        const favRef = doc(db, "favorites", `${user.uid}`);
        try {
          const snapshot = await getDoc(favRef);
          const favs = snapshot.data();
          favList(favs.product);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchLikes();
    }
  }, []);
  // Trae todos los favoritos desde el contexto favs para renderizarlos en item
  useEffect(() => {
    async function fetchData() {
      try {
        const db = getFirestore();
        const prodFavs = collection(db, "parallaxhumanoid");
        const q = query(prodFavs, where(documentId(), "in", favs));
        const querySnapshot = await getDocs(q);
        const itemsData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          uid: doc.id,
        }));
        setItems(itemsData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
    fetchData();
  }, [favs]);

  if (loading) {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{
          minHeight: "100vh",
          paddingTop: "200px",
          backgroundColor: "#cfd8dc",
        }}
      >
        <Grid item xs={3}>
          <RingLoader color="#4a90e2" />
          <Typography>Loading...</Typography>
        </Grid>
      </Grid>
    );
  }
  return (
    <div>
      <Typography align="center" paddingTop={10} fontSize={40}>
        My Wishlist
      </Typography>
      <div
        style={{
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          marginLeft: 300,
          marginTop: 60,
          marginBottom: 65,
        }}
      >
        {items && favs.length > 0 ? (
          items.map((product) => <Item key={product.id} item={product} />)
        ) : (
          <b>No items to display</b>
        )}
      </div>
    </div>
  );
}
