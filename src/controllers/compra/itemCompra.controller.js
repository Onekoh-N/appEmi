import {pool} from '../../database/db.js'


//List
const getItemCompraList = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM items_compra');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Somthing goes wrong'
        })
    }
};
//SearchById
const getItemCompra = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM items_compra WHERE id= ?', req.params.id);
        if (rows.length <= 0) return res.status(404).json({
            message: 'Item not found'
        });
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Somthing goes wrong'
        })
    }
};
//Create
const createItemCompra = async (req, res) => {
    try {
        const { cantidad,precio_compra,orden_compra_id,producto_id } = req.body;
        const [rows] = await pool.query('INSERT INTO items_compra (cantidad,precio_compra,orden_compra_id,producto_id) VALUES (?,?,?,?)', [cantidad,precio_compra,orden_compra_id,producto_id]);
        console.log(req.body);
        res.send({
            "id": rows.insertId,
            cantidad,precio_compra,orden_compra_id,producto_id
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Somthing goes wrong'
        })
    }
};
//Update
const updateItemCompra = async (req, res) => {
    try {
        const { id } = req.params;
        const { cantidad,precio_compra,orden_compra_id,producto_id } = req.body;
        const [result] = await pool.query('UPDATE items_compra SET cantidad = IFNULL(?, cantidad),  precio_compra = IFNULL(?, precio_compra),  orden_compra_id = IFNULL(?, orden_compra_id),   producto_id = IFNULL(?, producto_id) where id= ?', [cantidad,precio_compra,orden_compra_id,producto_id, id])
        if (result.affectedRows <= 0) return res.status(404).json({ message: 'itemCompra not found' })
        const [rows] = await pool.query('SELECT * FROM items_compra WHERE id= ?', req.params.id);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Somthing goes wrong'
        })
    }
};
//Delete
const deleteItemCompra = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM items_compra WHERE id= ?', req.params.id);
        if (result.affectedRows <= 0) return res.status(404).json({ message: 'itemCompra not found' })
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: 'Somthing goes wrong'
        })
    }
};

export default {
    getItemCompraList,
    getItemCompra,
    createItemCompra,
    updateItemCompra,
    deleteItemCompra
}