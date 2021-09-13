const { request, response } = require('express');
const express = require('express');
const { pool } = require('../database/index');
const router = express.Router();
require('dotenv').config();

// Add Item
router.post('/', async (request, response) => {
    
    try {
        if (request.body.name === undefined || request.body.name === null) {
            return response.send({
                success: false,
                error: "No hay nombre"
            });
        };

        if (request.body.price === undefined || request.body.price === null) {
            return response.send({
                success: false,
                error: "No hay precio"
            });
        };

        if (request.body.stock === undefined || request.body.stock === null) {
            return response.send({
                success: false,
                error: "No hay stock"
            });
        };

        if (request.body.wall === undefined || request.body.wall === null) {
            return response.send({
                success: false,
                error: "No hay pared"
            });
        };

        if (request.body.box === undefined || request.body.box === null) {
            return response.send({
                success: false,
                error: "No hay caja"
            });
        };
        

        const name = request.body.name;
        const price = request.body.price;
        const stock = request.body.stock;
        const wall = request.body.wall;
        const box = request.body.box;
        const origin = request.body.origin;
        const details = request.body.details;



        await pool.query('INSERT INTO item_stock (name, price, stock, wall, box, origin, details) VALUES ($1, $2, $3, $4, $5, $6, $7)', [name, price, stock, wall, box, origin, details]);

        const itemListDB = await pool.query('SELECT * FROM item_stock');
        if (itemListDB.rowCount > 0) {
            return response.send({
                success: true,
                itemList: itemListDB.rows
            });
        } else {
            return response.send({
                success: false,
                itemList: [],
                message: 'Esto no deberia pasar, intentelo en unos minutos'
            });
        }
        
        const itemList = itemListDB.rows;

        return response.send({
            success: true,
            itemList
        }); 

    } catch (ex) {
        console.log(ex)
             return response.send({
                 success: false,
                 error: "Ha ocurrido un error"
                });
                
    };          

});

// Item Search
router.get('/:searchItem', async (request, response) => { 
  try {

    console.log('req.params.searchItem', request.params.searchItem);

    const searchTerm = `%${request.params.searchTerm}%`;
    let itemsResult = await pool.query("SELECT id, name FROM sensors WHERE deleted = false AND name ILIKE $1 ", [searchTerm]);
    if (itemsResult.rowCount > 0) {
      return response.send({
        message: 'Estos son los items',
        items: itemsResult.rows
      });
    } else {
      return response.send({
        message: 'No hay items',
        items: []
      });
    }
  } catch(ex) {
    return response.send({ error: ex })
  }
});

// Item List
router.get('/', async (request, response) => {
    try {

        const itemListDB = await pool.query('SELECT * FROM item_stock');

        return response.send({
            success: true,
            itemList: itemListDB.rows
        });


    } catch (ex) {
        return response.send({
            success: false,
            error: "Ha ocurrido un error"
        });
                
    };       
});

// Delete Item
router.delete('/:itemId', async (request, response) => {
    try {
        const itemId = parseInt(request.params.itemId);
        if (isNaN(itemId)) {
            return response.send({
                success: false,
                error: "El Id no es un valor valido"
            });
        }
        const deleteRes = await pool.query('DELETE FROM item_stock WHERE id = $1', [itemId]);
        if (deleteRes.rowCount === 1) {
            return response.send({
                success: true,
                message: `Item ${itemId} eliminado`
            });
        }
        else {
          return response.send({
            success: false,
            message: `Item ${itemId} no fue eliminado`
          });
        }
    } catch (ex) {
        return response.send({
            success: false,
            error: "No se pudo eliminar el item"
        });
    }
}); 

// Modify Item
router.put('/:itemId', async (request, response) => {
    try {
      if (!request.params.itemId) {
        return response.send({ error: 'No se encuentra id' })
      }
      if (!request.body.name) {
        return response.send({ error: 'No se encuentra ese nombre' })
      }
      if (!request.body.price) {
        return response.send({ error: 'No se encuentra precio' })
      }
      if (!request.body.stock) {
        return response.send({ error: 'No se encuentra stock' })
      }
      if (!request.body.wall) {
        return response.send({ error: 'No se encuentra pared' })
      }
      if (!request.body.box) {
        return response.send({ error: 'No se encuentra caja' })
      }
      if (!request.body.origin) {
        return response.send({ error: 'No se encuentra origen' })
      }
      if (!request.body.details) {
        return response.send({ error: 'No se encuentran detalles' })
      }
      
      const name = request.body.name;
      const price = request.body.price;
      const stock = request.body.stock;
      const wall = request.body.wall;
      const box = request.body.box;
      const origin = request.body.origin;
      const details = request.body.details;
      const idToUpdate = request.params.itemId;
  
      let itemUpdateResult = await pool.query('SELECT * FROM item_stock WHERE id = $1 AND deleted = false', [idToUpdate]);
      if (itemUpdateResult.rowCount === 0) {
        return response.send({ 
          message: 'No hay un item con esa id',
        });
      }
    
      await pool.query('UPDATE item_stock SET name = $1, price = $2, stock = $3, wall = $4, box = $5, origin = $6, details = $7 WHERE id = $8', [name, price, stock, wall, box, origin, details, idToUpdate]);
  
      itemUpdateResult = await pool.query('SELECT * FROM item_stock WHERE id = $1 AND deleted = false', [idToUpdate]);
      if (itemUpdateResult.rowCount === 1) {
        return response.send({ 
          message: 'Item actualizado',
          sensor: itemUpdateResult.rows[0]
        });
      }
      
      return response.send({
        message: 'Item no actualizado'
      });
    } catch(ex) {
      return response.send({ error: ex })
    }
  });


module.exports = {
    router: router
};