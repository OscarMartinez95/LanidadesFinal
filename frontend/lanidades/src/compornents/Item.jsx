const Item = ({ item }) => {
  
    const { id, name, price, stock, wall, box, origin, details } = item;

    
    return (
      <div>
        <p>Id: {id}</p>
        <p>Nombre: {name}</p>
        <p>Precio: {price}</p>
        <p>Stock: {stock}</p>
        <p>Pared: {wall}</p>
        <p>Caja: {box}</p>
        <p>Origen: {origin}</p>
        <p>Detalles: {details}</p>
      </div>
    )
  }
  
  export default Item;