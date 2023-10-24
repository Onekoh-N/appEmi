import { pool } from '../database/db.js'

//List
const getProductoList = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM productos');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Somthing goes wrong'
        })
    }
};
//SearchById
const getProducto = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM productos WHERE id= ?', req.params.id);
        if (rows.length <= 0) return res.status(404).json({
            message: 'Producto not found'
        });
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Somthing goes wrong'
        })
    }
};
//Create
const createProducto = async (req, res) => {
    try {
        const { nombre,descripcion,presentacion,cantidad,precio_compra,precio_venta,categoria_id } = req.body;
        const [rows] = await pool.query('INSERT INTO productos (nombre,descripcion,presentacion,cantidad,precio_compra,precio_venta,categoria_id) VALUES (?,?,?,?,?,?,?)', [nombre,descripcion,presentacion,cantidad,precio_compra,precio_venta,categoria_id]);
        console.log(req.body);
        res.send({
            "id": rows.insertId,
            nombre,descripcion,presentacion,cantidad,precio_compra,precio_venta,categoria_id
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Somthing goes wrong'
        })
    }
};
//Update
const updateProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre,descripcion,presentacion,cantidad,precio_compra,precio_venta,categoria_id } = req.body;
        const [result] = await pool.query('UPDATE productos SET nombre = IFNULL(?, nombre),  descripcion = IFNULL(?, descripcion),  presentacion = IFNULL(?, presentacion),  cantidad = IFNULL(?, cantidad),  precio_compra = IFNULL(?, precio_compra),  precio_venta = IFNULL(?, precio_venta),  categoria_id = IFNULL(?, categoria_id) where id= ?', [nombre,descripcion,presentacion,cantidad,precio_compra,precio_venta,categoria_id, id])
        if (result.affectedRows <= 0) return res.status(404).json({ message: 'Producto not found' })
        const [rows] = await pool.query('SELECT * FROM productos WHERE id= ?', req.params.id);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Somthing goes wrong'
        })
    }
};
//Delete
const deleteProducto = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM productos WHERE id= ?', req.params.id);
        if (result.affectedRows <= 0) return res.status(404).json({ message: 'Producto not found' })
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: 'Somthing goes wrong'
        })
    }
};

export default {
    getProductoList,
    getProducto,
    createProducto,
    updateProducto,
    deleteProducto
}