
import { pool } from '../database/db.js'

//List
const getUsuarioList = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM usuarios');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Somthing goes wrong'
        })
    }
};
//SearchById
const getUsuario = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE id= ?', req.params.id);
        if (rows.length <= 0) return res.status(404).json({
            message: 'Usuario not found'
        });
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Somthing goes wrong'
        })
    }
};
//Create
const createUsuario = async (req, res) => {
    try {
        const { nombre,email,telefono,password,rol_id } = req.body;
        const [rows] = await pool.query('INSERT INTO usuarios (nombre,email,telefono,password,rol_id) VALUES (?,?,?,?,?)', [nombre,email,telefono,password,rol_id]);
        res.send({
            "id": rows.insertId,
            nombre,email,telefono,password,rol_id
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Somthing goes wrong'
        })
    }
};
//Update
const updateUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre,email,telefono,password,rol_id } = req.body;
        const [result] = await pool.query('UPDATE usuarios SET nombre = IFNULL(?, nombre),  email = IFNULL(?, email),  telefono = IFNULL(?, telefono),  password = IFNULL(?, password),  rol_id = IFNULL(?, rol_id) where id= ?', [nombre,email,telefono,password,rol_id, id])
        if (result.affectedRows <= 0) return res.status(404).json({ message: 'Usuario not found' })
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE id= ?', req.params.id);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Somthing goes wrong'
        })
    }
};
//Delete
const deleteUsuario = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM usuarios WHERE id= ?', req.params.id);
        if (result.affectedRows <= 0) return res.status(404).json({ message: 'Usuario not found' })
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: 'Somthing goes wrong'
        })
    }
};

export default {
    getUsuarioList,
    getUsuario,
    createUsuario,
    updateUsuario,
    deleteUsuario
}