import Catalog from "../../Products.json";
import Item from "../Item/Item.jsx";

export default function ItemList({items}) {
  const robcatalog = Catalog.robotsCatalog;
  return (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'nowrap' , marginLeft: 30, marginTop: 60, marginBottom: 65   }}>
      {robcatalog.map((product) => (
        <Item
          key={product.id}
          ProductImage={product.ProductImage}
          ProductName={product.ProductName}
          ProductDescription={product.ProductDescription}
          id={product.id}
        />
      ))}
    </div> 
  );
}