import {pool} from '../../database/db.js'


//List
const getItemVentaList = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM items_venta');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Somthing goes wrong'
        })
    }
};
//SearchById
const getItemVenta = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM items_venta WHERE id= ?', req.params.id);
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
const createItemVenta = async (req, res) => {
    try {
        const { cantidad,precio_venta,producto_id,orden_venta_id } = req.body;
        const [rows] = await pool.query('INSERT INTO items_venta (cantidad,precio_venta,producto_id,orden_venta_id) VALUES (?,?,?,?)', [cantidad,precio_venta,producto_id,orden_venta_id]);
        console.log(req.body);
        res.send({
            "id": rows.insertId,
            cantidad,precio_venta,producto_id,orden_venta_id
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Somthing goes wrong'
        })
    }
};
//Update
const updateItemVenta = async (req, res) => {
    try {
        const { id } = req.params;
        const { cantidad,precio_venta,producto_id,orden_venta_id } = req.body;
        const [result] = await pool.query('UPDATE items_venta SET cantidad = IFNULL(?, cantidad),  precio_venta = IFNULL(?, precio_venta),  producto_id = IFNULL(?, producto_id),   orden_venta_id = IFNULL(?, orden_venta_id) where id= ?', [cantidad,precio_venta,producto_id,orden_venta_id, id])
        if (result.affectedRows <= 0) return res.status(404).json({ message: 'itemVenta not found' })
        const [rows] = await pool.query('SELECT * FROM items_venta WHERE id= ?', req.params.id);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Somthing goes wrong'
        })
    }
};
//Delete
const deleteItemVenta = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM items_venta WHERE id= ?', req.params.id);
        if (result.affectedRows <= 0) return res.status(404).json({ message: 'itemVenta not found' })
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: 'Somthing goes wrong'
        })
    }
};

export default {
    getItemVentaList,
    getItemVenta,
    createItemVenta,
    updateItemVenta,
    deleteItemVenta
}