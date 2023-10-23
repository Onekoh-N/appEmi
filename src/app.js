import express from 'express';
import employeesRoutes from './routes/employees.routes.js';
import indexRoutes from './routes/index.routes.js';
import {PORT} from './config.js';

//Initialization
const app= express();


//Settings
app.use(express.json());
app.set('port', PORT);

//Routes
app.use(indexRoutes);
app.use(employeesRoutes);
app.use((req, res)=>{
    res.status(404).json({
        message: 'endpoint not found'
    })
})

export default app;
