import Item from "../Item/Item.jsx";

export default function ItemList({items}) {
  return (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'nowrap' , marginLeft: 30, marginTop: 60, marginBottom: 65   }}>
      {items.map((product) => (
        <Item
          key={product.id}
          item={product}
        />
      ))}
    </div> 
  );
}