import "./ItemListContainer.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemList from "../Itemlist/Itemlist";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import ItemCount from "../ItemCount/ItemCount";

export default function ItemListContainer() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      const refCollection = collection(db, "parallaxhumanoid");
      try {
        const snapshot = await getDocs(refCollection);
        if (snapshot.size === 0) {
          console.log("No results");
        }
        if (id) {
          const filteredData = snapshot.docs
            .filter((doc) => doc.data().Category === id)
            .map((doc) => ({
              ...doc.data(),
              uid: doc.id,
            }));
          setItems(filteredData);
        } else {
          const itemsData = snapshot.docs.map((doc) => ({
            ...doc.data(),
            uid: doc.id,
          }));
          setItems(itemsData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div>
      <div className="sectioncontainer">
        <div className="section">
          <ItemList loading={loading} items={items} />
        </div>
      </div>
    </div>
  );
}
