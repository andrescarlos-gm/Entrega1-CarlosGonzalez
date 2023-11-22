import "./ItemListContainer.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemList from "../Itemlist/Itemlist";
const url = "https://6544295e5a0b4b04436c18e0.mockapi.io/v1/parallaxHumanoid/"

export default function ItemListContainer() {
  const [items , setItems] = useState ([])
  const [loading, setLoading] = useState(true)
  const {id} = useParams();

   useEffect(()=>{
    const fetchData = () => {
     const promise = new Promise((resolve) => {
       setTimeout(()=> {
        resolve(url + (id ? `?category=${id}` : ''));
      }, 2000);
     });

     promise
     .then((response) => fetch(response))
     .then((fetchResponse) => fetchResponse.json())
     .then((data) => {
       if (id) {
         const filterRes = data.filter((item) => item.category === id);
         setItems(filterRes);
       } else {
         setItems(data);
       }
     })
     .finally(() => setLoading(false));
 };

 fetchData();
}, [id]);

  return (
    <div>
      <div className="sectioncontainer">
        <div className="section">
        <ItemList items={items} loading={loading}   />
        </div>
      </div>
    </div>
  );
}
