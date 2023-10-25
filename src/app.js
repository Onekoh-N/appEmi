import express from 'express';

import proveedorRoutes from './routes/Proveedor.routes.js';
import carritoCompraRoutes from './routes/compra/carritoCompra.routes.js';
import rolRoutes from './routes/Rol.routes.js';
import usuarioRoutes from './routes/Usuario.routes.js';
import carritoVentaRoutes from './routes/venta/carritoVenta.routes.js';
import categoriaRoutes from './routes/Categoria.routes.js';
import productoRoutes from './routes/Producto.routes.js';
import itemVentaRoutes from './routes/venta/itemVenta.routes.js';
import itemCompraRoutes from './routes/compra/itemCompra.routes.js';
import {PORT} from './config.js';

//Initialization 
const app= express();

//Settings
app.use(express.json());
app.set('port', PORT);

//Routes

app.use(proveedorRoutes);
app.use(carritoCompraRoutes);
app.use(rolRoutes);
app.use(usuarioRoutes);
app.use(carritoVentaRoutes);
app.use(categoriaRoutes);
app.use(productoRoutes);
app.use(itemVentaRoutes);
app.use(itemCompraRoutes);

app.use((req, res)=>{
    res.status(404).json({
        message: 'endpoint not found'
    })
})

export default app;
