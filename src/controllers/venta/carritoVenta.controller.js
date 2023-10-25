import {pool} from '../../database/db.js'


//List
const getCarritoVentasList = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM carritos_ventas');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Somthing goes wrong'
        })
    }
};
//SearchById
const getCarritoVentas = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM carritos_ventas WHERE id= ?', req.params.id);
        if (rows.length <= 0) return res.status(404).json({
            message: 'Carrito_ventas not found'
        });
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Somthing goes wrong'
        })
    }
};
//Create
const createCarritoVentas = async (req, res) => {
    try {
        const { envio,comprador,usuario_id,total } = req.body;
        const [rows] = await pool.query('INSERT INTO carritos_ventas (envio,comprador,usuario_id,total) VALUES (?,?,?,?)', [envio,comprador,usuario_id,total]);
        res.send({
            "id": rows.insertId,
            envio,comprador,usuario_id,total
        });
    } catch (error) {
        return res.status(500).json({            
            message: 'Somthing goes wrong'
        })
    }
};
//Update
const updateCarritoVentas = async (req, res) => {
    try {
        const { id } = req.params;
        const { envio,comprador,usuario_id,total } = req.body;
        const [result] = await pool.query('UPDATE carritos_ventas SET envio = IFNULL(?, envio),  comprador = IFNULL(?, comprador),  usuario_id = IFNULL(?, usuario_id),  total = IFNULL(?, total) where id= ?', [envio,comprador,usuario_id,total, id])
        if (result.affectedRows <= 0) return res.status(404).json({ message: 'CarritoVentas not found' })
        const [rows] = await pool.query('SELECT * FROM carritos_ventas WHERE id= ?', req.params.id);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Somthing goes wrong'
        })
    }
};
//Delete
const deleteCarritoVentas = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM carritos_ventas WHERE id= ?', req.params.id);
        if (result.affectedRows <= 0) return res.status(404).json({ message: 'CarritoVentas not found' })
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: 'Somthing goes wrong'
        })
    }
};

export default {
    getCarritoVentasList,
    getCarritoVentas,
    createCarritoVentas,
    updateCarritoVentas,
    deleteCarritoVentas
}