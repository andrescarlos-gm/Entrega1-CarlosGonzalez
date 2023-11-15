import "./ItemListContainer.css";
import { useState, useEffect } from "react";
import products from "../../Products.json"

export default function ItemListContainer() {
  const [items , setItems] = useState ([])
  const [loading, setLoading] = useState(true)
  
  useEffect(()=>{
    const promise = new Promise((resolve, reject) => {
      setTimeout(()=> {
        resolve(products);
      }, 2000);
    }) 
    promise.then((response)=>{
      setItems(response);
    }).finally(()=> setLoading(false))
  }, [] );


  return (
    <div>
      <div className="bgimg1">
        <div className="caption">
          <span className="border">
            <p className="typ">
              Transform your life with a super A+ robot assistant
            </p>
          </span>
        </div>
      </div>
      <div className="sectioncontainer">
        <div className="section">
  

  
        </div>
      </div>
      <div className="bgimg2">
        <div className="caption2">
          <span className="border2">
            NPU interface developed according <br />
            to the AIS 2100-XI regulation of
            <br /> the International Association for Human-Robot Safety (AMSHR),
            <br /> which ensures the well-being of humans and automatons.
          </span>
        </div>
      </div>
      <div className="sectioncontainer2">
        <div className="section2">
          <p>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            Discover the perfect symbiosis between the latest innovation and
            personalized luxury, where technological excellence meets the most
            exquisite style.
          </p>
        </div>
      </div>
    </div>
  );
}
