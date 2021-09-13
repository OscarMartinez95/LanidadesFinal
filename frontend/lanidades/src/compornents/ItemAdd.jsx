import React, { Fragment, useState } from 'react';
import './ItemAdd.css';




const ItemAdd = () => {


    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [wall, setWall] = useState('');
    const [box, setBox] = useState('');
    const [origin, setOrigin] = useState('');
    const [details, setDetails] = useState('');
    const [isPending, setIsPending] = useState(false);


    const handleSubmit = (e) => {

        const Item = { name, price, stock, wall, box, origin, details };

        setIsPending('true');

        fetch('http://localhost:4000/stock', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"},
            body: JSON.stringify(Item)
        }).then(() => {
            console.log('Item añadido');
            setIsPending(false);
        })
    }
    

    return (
        <Fragment>
            <div className="create">
                <form onSubmit={handleSubmit}>
                    <input id="name" placeholder="Nombre" required value={name} onChange={(e) => setName(e.target.value)} />
                    <input id="price"  placeholder="Precio" required value={price} onChange={(e) => setPrice(e.target.value)} />
                    <input id="stock"  placeholder="Stock" required value={stock} onChange={(e) => setStock(e.target.value)} />
                    <input id="wall"  placeholder="Pared" required value={wall} onChange={(e) => setWall(e.target.value)} />
                    <input id="box"  placeholder="Caja" required value={box} onChange={(e) => setBox(e.target.value)} />
                    <input id="origin"  placeholder="Origen" required value={origin} onChange={(e) => setOrigin(e.target.value)} />
                    <input id="details"  placeholder="Detalles" required value={details} onChange={(e) => setDetails(e.target.value)} />
                    { !isPending && <button>Agregar!</button>}
                    { isPending && <button disabled>Agregando...</button>}
                </form>
            </div>
        </Fragment>
    )
}



export default ItemAdd
