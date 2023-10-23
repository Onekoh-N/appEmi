CREATE DATABASE IF NOT EXISTS apidb;
USE apidb;

create table  if not exists employees(
id int not null auto_increment,
name varchar(50) not null,
salary decimal(10,2) not null,
primary key(id)
);

-- Tablas para AppEmi 
-- -----------------------------------------------------
-- Tabla proveedores
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS proveedores (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NULL UNIQUE,
  telefono VARCHAR(45) NOT NULL UNIQUE,
  direccion VARCHAR(255) NULL UNIQUE,
  delivery BOOLEAN NOT NULL,
  PRIMARY KEY (id)
  );


-- -----------------------------------------------------
-- Tabla Carritos Compras
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS carritos_compras (
  id INT NOT NULL AUTO_INCREMENT,
  total DECIMAL(10,2) NOT NULL,
  envio BOOLEAN NOT NULL,
  fecha_compra DATETIME DEFAULT CURRENT_TIMESTAMP,
  proveedor_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (proveedor_id) REFERENCES proveedores (id)
  );

-- -----------------------------------------------------
-- Tabla roles
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS roles (
  id INT NOT NULL AUTO_INCREMENT,
  nombre_rol VARCHAR(45) NOT NULL UNIQUE,
  descripcion VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
  );


-- -----------------------------------------------------
-- Tabla usuarios
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS usuarios (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  telefono VARCHAR(45) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  rol_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (rol_id) REFERENCES roles (id)
  );


-- -----------------------------------------------------
-- Tabla carritos_ventas
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS carritos_ventas (
  id INT NOT NULL AUTO_INCREMENT,
  envio BOOLEAN NOT NULL,
  comprador VARCHAR(255) NOT NULL,
  fecha_venta DATETIME DEFAULT CURRENT_TIMESTAMP,
  usuario_id INT NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
    );


-- -----------------------------------------------------
-- Tabla categorias
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS categorias (
  id INT NOT NULL AUTO_INCREMENT,
  nombre_categoria VARCHAR(45) NOT NULL UNIQUE,
  descripcion VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
  );


-- -----------------------------------------------------
-- Tabla productos
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS productos (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(255) NOT NULL UNIQUE,
  descripcion VARCHAR(255) NULL,
  presentacion VARCHAR(45) NOT NULL,
  cantidad INT NOT NULL,
  precio_compra DECIMAL(10,2) NOT NULL,
  precio_venta DECIMAL(10,2) NOT NULL,
  fecha_modificacion DATETIME DEFAULT CURRENT_TIMESTAMP,
  categoria_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (categoria_id)    REFERENCES categorias (id)
  );


-- -----------------------------------------------------
-- Tabla items_venta
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS items_venta (
  id INT AUTO_INCREMENT PRIMARY KEY,
	cantidad INT NOT NULL,
	precio_venta DECIMAL(10,2) NOT NULL,
	producto_id INT NOT NULL,
	orden_venta_id INT NOT NULL,
	FOREIGN KEY (producto_id) REFERENCES productos (id),
	FOREIGN KEY (orden_venta_id) REFERENCES carritos_ventas (id)
);


-- -----------------------------------------------------
-- Tabla items_compra
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS items_compra (
  id INT AUTO_INCREMENT PRIMARY KEY,
	cantidad INT NOT NULL,
	precio_compra DECIMAL(10,2) NOT NULL,
	orden_compra_id INT NOT NULL,
	producto_id INT NOT NULL,
	FOREIGN KEY (orden_compra_id) REFERENCES carritos_compras (id),
	FOREIGN KEY (producto_id) REFERENCES productos (id)
);
