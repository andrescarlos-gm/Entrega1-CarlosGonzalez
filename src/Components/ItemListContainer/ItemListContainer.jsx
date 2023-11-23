import "./ItemListContainer.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemList from "../Itemlist/Itemlist";
const url = "https://6544295e5a0b4b04436c18e0.mockapi.io/v1/parallaxHumanoid/";

export default function ItemListContainer() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url + (id ? `?category=${id}` : ""));
        const data = await response.json();
        if (id) {
          const filteredData = data.filter((item) => item.Category === id);
          setItems(filteredData);
        } else {
          setItems(data);
        }
      } catch (error) {
        console.error("error fetching data:", error);
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
          <ItemList items={items} loading={loading} />
        </div>
      </div>
    </div>
  );
}
