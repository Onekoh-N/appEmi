import { pool } from '../database/db.js'

//List
const getCategoriaList = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM categorias');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Somthing goes wrong'
        })
    }
};
//SearchById
const getCategoria = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM categorias WHERE id= ?', req.params.id);
        if (rows.length <= 0) return res.status(404).json({
            message: 'Categoria not found'
        });
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Somthing goes wrong'
        })
    }
};
//Create
const createCategoria = async (req, res) => {
    try {
        const { nombre_categoria,descripcion } = req.body;
        const [rows] = await pool.query('INSERT INTO categorias (nombre_categoria,descripcion) VALUES (?,?)', [nombre_categoria,descripcion]);
        console.log(req.body);
        res.send({
            "id": rows.insertId,
            nombre_categoria,descripcion
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Somthing goes wrong'
        })
    }
};
//Update
const updateCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_categoria,descripcion } = req.body;
        const [result] = await pool.query('UPDATE categorias SET nombre_categoria = IFNULL(?, nombre_categoria),  descripcion = IFNULL(?, descripcion) where id= ?', [nombre_categoria,descripcion, id])
        if (result.affectedRows <= 0) return res.status(404).json({ message: 'Categoria not found' })
        const [rows] = await pool.query('SELECT * FROM categorias WHERE id= ?', req.params.id);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Somthing goes wrong'
        })
    }
};
//Delete
const deleteCategoria = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM categorias WHERE id= ?', req.params.id);
        if (result.affectedRows <= 0) return res.status(404).json({ message: 'Categoria not found' })
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: 'Somthing goes wrong'
        })
    }
};

export default {
    getCategoriaList,
    getCategoria,
    createCategoria,
    updateCategoria,
    deleteCategoria
}