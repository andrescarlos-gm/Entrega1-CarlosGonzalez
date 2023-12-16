import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import "./ItemListContainer.css";
import Footer from "../Footer/Footer";
import ItemList from "../Itemlist/Itemlist";

export default function ItemListContainer() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const { id } = useParams();
  document.documentElement.scrollTo(0, 0);

  useEffect(() => {
    setLoading(true)
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

  const isRoot = id === undefined;

  return (
    <div>
      {isRoot && (
        <div className="bgimg1">
          <div className="caption">
            <span className="border">
              <p className="typ">
                Transform your life with a S+ robot assistant!
              </p>
            </span>
          </div>
        </div>
      )}
      <div className="sectioncontainer">
        <div className="section">
          <ItemList loading={loading} items={items} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
