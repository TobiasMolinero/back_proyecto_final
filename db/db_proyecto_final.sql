DROP DATABASE proyecto_final;
CREATE DATABASE proyecto_final;

USE proyecto_final;

CREATE TABLE venta(
	id_venta INT PRIMARY KEY AUTO_INCREMENT,
	nro_factura INT CHECK(nro_factura > 0) NOT NULL,
    fecha DATETIME NOT NULL,
    id_cliente INT NOT NULL,
    id_metodo_pago INT NOT NULL,
    id_tipo_factura INT NOT NULL,
    id_estado_venta INT NOT NULL,
    observaciones VARCHAR(1000),
    importe_total DECIMAL(10, 2) CHECK(importe_total > 0) NOT NULL,
    estado_registro TINYINT DEFAULT 1  
);

CREATE TABLE detalle_venta(
	id_venta INT NOT NULL,
	id_producto INT NOT NULL,
    cantidad INT CHECK(cantidad > 0) NOT NULL
);

CREATE TABLE tipo_factura(
	id_tipo_factura INT PRIMARY KEY AUTO_INCREMENT,
    factura VARCHAR(1) NOT NULL,
    estado_registro TINYINT DEFAULT 1
);

CREATE TABLE estado_venta(
	id_estado_venta INT PRIMARY KEY AUTO_INCREMENT,
    estado VARCHAR(30) NOT NULL,
    estado_registro TINYINT DEFAULT 1
);

CREATE TABLE metodo_pago(
	id_metodo_pago INT PRIMARY KEY AUTO_INCREMENT,
    metodo VARCHAR(30) NOT NULL,
    estado_registro TINYINT DEFAULT 1
);

CREATE TABLE producto(
	id_producto INT PRIMARY KEY AUTO_INCREMENT,
    cod_producto VARCHAR(50) UNIQUE NOT NULL,
    nombre_producto VARCHAR(50) NOT NULL,
    id_categoria_producto INT NOT NULL,
    descripcion VARCHAR(100),
    precio DECIMAL(10, 2) CHECK(precio >= 0) NOT NULL,
    estado_registro TINYINT DEFAULT 1
);

CREATE TABLE categoria_producto(
	id_categoria_producto INT PRIMARY KEY AUTO_INCREMENT,
    categoria_producto VARCHAR(30) NOT NULL,
    estado_registro TINYINT DEFAULT 1
);

CREATE TABLE cliente(
	id_cliente INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50),
    nro_documento VARCHAR(50),
    razon_social VARCHAR(50),
    domicilio VARCHAR(100),
    telefono VARCHAR(100),
    correo VARCHAR(100),
    activo TINYINT DEFAULT 1
);

CREATE TABLE inventario(
	id_producto INT UNIQUE NOT NULL,
    stock INT CHECK(stock >= 0) DEFAULT 0 NOT NULL,
    estado_registro TINYINT DEFAULT 1
);
DROP TABLE inventario;

/* CREATE TABLE ingreso_mercaderia(
	id_producto INT NOT NULL,
    fecha_ingreso DATETIME,
    cantidad INT CHECK(cantidad > 0) NOT NULL,
    estado_registro TINYINT DEFAULT 1
); */

CREATE TABLE gasto(
	id_gasto INT PRIMARY KEY AUTO_INCREMENT,
    id_categoria_gasto INT NOT NULL,
    fecha DATETIME NOT NULL,
    importe DECIMAL(10, 2) CHECK(importe > 0) NOT NULL,
    detalle VARCHAR(150) NOT NULL,
    estado_registro TINYINT DEFAULT 1
);

CREATE TABLE categoria_gasto(
	id_categoria_gasto INT PRIMARY KEY AUTO_INCREMENT,
    categoria VARCHAR(100) NOT NULL,
    estado_registro TINYINT DEFAULT 1
);

CREATE TABLE persona(
	id_persona INT PRIMARY KEY AUTO_INCREMENT,
	nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(200) NOT NULL,
    telefono VARCHAR(100) NOT NULL
);

CREATE TABLE usuario(
	id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    usuario VARCHAR(100) NOT NULL,
    contraseña VARCHAR(1000) NOT NULL,
	id_rol_usuario INT NOT NULL,
    id_persona INT NOT NULL,
    activo TINYINT DEFAULT 1
);

CREATE TABLE rol_usuario(
	id_rol_usuario INT PRIMARY KEY AUTO_INCREMENT,
    descripcion VARCHAR(20),
    estado_registro TINYINT DEFAULT 1
);

/* CLAVES FORANEAS */
/* VENTAS */
ALTER TABLE venta
ADD CONSTRAINT fk_venta_cliente
FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente);

ALTER TABLE venta
ADD CONSTRAINT fk_venta_estado
FOREIGN KEY (id_estado_venta) REFERENCES estado_venta(id_estado_venta);

ALTER TABLE venta
ADD CONSTRAINT fk_venta_metodo
FOREIGN KEY (id_metodo_pago) REFERENCES metodo_pago(id_metodo_pago);

ALTER TABLE venta
ADD CONSTRAINT fk_venta_factura
FOREIGN KEY (id_tipo_factura) REFERENCES tipo_factura(id_tipo_factura);

/* PRODUCTO */
ALTER TABLE producto
ADD CONSTRAINT fk_producto_categoria
FOREIGN KEY (id_categoria_producto) REFERENCES categoria_producto(id_categoria_producto);

/* DETALLE PEDIDO */
ALTER TABLE detalle_venta
ADD CONSTRAINT fk_detalle_venta
FOREIGN KEY (id_venta) REFERENCES venta(id_venta);

ALTER TABLE detalle_venta
ADD CONSTRAINT fk_detalle_producto
FOREIGN KEY (id_producto) REFERENCES producto(id_producto);

/* USUARIOS */
ALTER TABLE usuario 
ADD CONSTRAINT fk_usuario_rol
FOREIGN KEY (id_rol_usuario) REFERENCES rol_usuario(id_rol_usuario);

ALTER TABLE usuario
ADD CONSTRAINT fk_usuario_persona
FOREIGN KEY (id_persona) REFERENCES persona(id_persona)
ON DELETE CASCADE;

/* GASTOS */
ALTER TABLE gasto
ADD CONSTRAINT fk_gasto_categoria
FOREIGN KEY (id_categoria_gasto) REFERENCES categoria_gasto(id_categoria_gasto);

/* INVENTARIO */
ALTER TABLE inventario
ADD CONSTRAINT fk_inventario_producto
FOREIGN KEY (id_producto) REFERENCES producto(id_producto);

SET SQL_SAFE_UPDATES = 0;


