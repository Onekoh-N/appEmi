import {pool} from '../../database/db.js'


//List
const getCarritoComprasList = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM carritos_compras');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Somthing goes wrong'
        })
    }
};
//SearchById
const getCarritoCompras = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM carritos_compras WHERE id= ?', req.params.id);
        if (rows.length <= 0) return res.status(404).json({
            message: 'Carrito_compras not found'
        });
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Somthing goes wrong'
        })
    }
};
//Create
const createCarritoCompras = async (req, res) => {
    try {
        const { total,envio,proveedor_id } = req.body;
        const [rows] = await pool.query('INSERT INTO carritos_compras (total,envio,proveedor_id) VALUES (?,?,?)', [total,envio,proveedor_id]);
        console.log(req.body);
        res.send({
            "id": rows.insertId,
            total,envio,proveedor_id
        });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            message: 'Somthing goes wrong'
        })
    }
};
//Update
const updateCarritoCompras = async (req, res) => {
    try {
        const { id } = req.params;
        const { total,envio,proveedor_id } = req.body;
        const [result] = await pool.query('UPDATE carritos_compras SET total = IFNULL(?, total),  envio = IFNULL(?, envio),  proveedor_id = IFNULL(?, proveedor_id) where id= ?', [total,envio,proveedor_id, id])
        if (result.affectedRows <= 0) return res.status(404).json({ message: 'CarritoCompras not found' })
        const [rows] = await pool.query('SELECT * FROM carritos_compras WHERE id= ?', req.params.id);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Somthing goes wrong'
        })
    }
};
//Delete
const deleteCarritoCompras = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM carritos_compras WHERE id= ?', req.params.id);
        if (result.affectedRows <= 0) return res.status(404).json({ message: 'CarritoCompras not found' })
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: 'Somthing goes wrong'
        })
    }
};

export default {
    getCarritoComprasList,
    getCarritoCompras,
    createCarritoCompras,
    updateCarritoCompras,
    deleteCarritoCompras
}