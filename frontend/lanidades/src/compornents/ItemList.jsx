import React, { Fragment, useEffect, useState } from 'react';
import './ItemList.css';




function ItemList() {
    
    const [items, setStock] = useState([]); 
    useEffect(() => {
        fetch('http://localhost:4000/stock', {
        method: "GET"})
        .then((response) => {
        return response.json();
        }).then((data) => {  
        setStock(data.itemList) 
        })
    }, )

const handleDelete= (id) => {
    fetch('http://localhost:4000/stock/' + id, {
        method: 'DELETE'
    })
}



return (
    <Fragment>
        <li>
            {!items ? "Cargando..." :
            items.map( item => 
                    <div key={item.id} className="Stock">
                                <p>Nombre: {item.name}</p>
                                <p>Precio: {item.price}</p> 
                                <p>Stock: {item.stock}</p>
                                <p>Pared: {item.wall}</p> 
                                <p>Caja: {item.box}</p>
                                <p>Origen: {item.origin}</p>
                                <p>Detalles: {item.details}</p>
                                <button onClick={() => handleDelete(item.id)}>Borrar</button>
                    </div>
                )}
        </li>
   </Fragment>
)
}
export default ItemList