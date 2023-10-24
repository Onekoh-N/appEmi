
import { pool } from '../database/db.js'

//List
const getRolList = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM roles');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Somthing goes wrong'
        })
    }
};
//SearchById
const getRol = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM roles WHERE id= ?', req.params.id);
        if (rows.length <= 0) return res.status(404).json({
            message: 'Rol not found'
        });
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Somthing goes wrong'
        })
    }
};
//Create
const createRol = async (req, res) => {
    try {
        const { nombre_rol,descripcion } = req.body;
        const [rows] = await pool.query('INSERT INTO roles (nombre_rol,descripcion) VALUES (?,?)', [nombre_rol,descripcion]);
        console.log(req.body);
        res.send({
            "id": rows.insertId,
            nombre_rol,descripcion
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Somthing goes wrong'
        })
    }
};
//Update
const updateRol = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_rol,descripcion } = req.body;
        const [result] = await pool.query('UPDATE roles SET nombre_rol = IFNULL(?, nombre_rol),  descripcion = IFNULL(?, descripcion) where id= ?', [nombre_rol,descripcion, id])
        if (result.affectedRows <= 0) return res.status(404).json({ message: 'Rol not found' })
        const [rows] = await pool.query('SELECT * FROM roles WHERE id= ?', req.params.id);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Somthing goes wrong'
        })
    }
};
//Delete
const deleteRol = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM roles WHERE id= ?', req.params.id);
        if (result.affectedRows <= 0) return res.status(404).json({ message: 'Rol not found' })
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: 'Somthing goes wrong'
        })
    }
};

export default {
    getRolList,
    getRol,
    createRol,
    updateRol,
    deleteRol
}