
import { pool } from '../database/db.js'

//List
const getProveedorList = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM proveedores');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Somthing goes wrong'
        })
    }
};
//SearchById
const getProveedor = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM proveedores WHERE id= ?', req.params.id);
        if (rows.length <= 0) return res.status(404).json({
            message: 'Proveedor not found'
        });
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Somthing goes wrong'
        })
    }
};
//Create
const createProveedor = async (req, res) => {
    try {
        const { nombre,email,telefono,direccion,delivery } = req.body;
        const [rows] = await pool.query('INSERT INTO proveedores (nombre,email,telefono,direccion,delivery) VALUES (?,?,?,?,?)', [nombre,email,telefono,direccion,delivery]);
        console.log(req.body);
        res.send({
            "id": rows.insertId,
            nombre,email,telefono,direccion,delivery
        });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            message: 'Somthing goes wrong'
        })
    }
};
//Update
const updateProveedor = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre,email,telefono,direccion,delivery } = req.body;
        const [result] = await pool.query('UPDATE proveedores SET nombre = IFNULL(?, nombre),  email = IFNULL(?, email),  telefono = IFNULL(?, telefono),  direccion = IFNULL(?, direccion),  delivery = IFNULL(?, delivery) where id= ?', [nombre,email,telefono,direccion,delivery, id])
        if (result.affectedRows <= 0) return res.status(404).json({ message: 'Proveedor not found' })
        const [rows] = await pool.query('SELECT * FROM proveedores WHERE id= ?', req.params.id);
        res.json(rows[0]);
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            message: 'Somthing goes wrong'
        })
    }
};
//Delete
const deleteProveedor = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM proveedores WHERE id= ?', req.params.id);
        if (result.affectedRows <= 0) return res.status(404).json({ message: 'Proveedor not found' })
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: 'Somthing goes wrong'
        })
    }
};

export default {
    getProveedorList,
    getProveedor,
    createProveedor,
    updateProveedor,
    deleteProveedor
}