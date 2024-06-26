DROP DATABASE proyecto_final;
CREATE DATABASE proyecto_final;

USE proyecto_final;

CREATE TABLE pedido(
id_pedido INT PRIMARY KEY AUTO_INCREMENT,
	nro_pedido INT CHECK(nro_pedido > 0) NOT NULL,
    fecha DATETIME NOT NULL,
    id_cliente INT NOT NULL,
    id_estado_pedido INT NOT NULL,
    observaciones VARCHAR(1000),
    importe_total DECIMAL(10, 2) CHECK(importe_total > 0) NOT NULL,
    estado_registro TINYINT DEFAULT 1  
);

CREATE TABLE detalle_pedido(
	nro_pedido INT NOT NULL,
	id_producto INT NOT NULL,
    cantidad INT CHECK(cantidad > 0) NOT NULL
);

CREATE TABLE estado_pedido(
	id_estado_pedido INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(30) NOT NULL,
    descripcion VARCHAR(150),
    estado_registro TINYINT DEFAULT 1
);

CREATE TABLE venta(
	id_venta INT PRIMARY KEY AUTO_INCREMENT,
    nro_pedido INT NOT NULL,
    id_estado_venta INT NOT NULL,
	id_metodo_pago INT NOT NULL,
    descuento DECIMAL(1, 2) CHECK(descuento >= 0) DEFAULT 0 NOT NULL,
    por_cobrar DECIMAL(10, 2) CHECK(por_cobrar >= 0) NOT NULL,
    cobrado DECIMAL(10, 2) CHECK(cobrado >= 0) NOT NULL,
    estado_registro TINYINT DEFAULT 1
);

CREATE TABLE cobros_venta(
	id_venta INT NOT NULL,
    fecha DATETIME NOT NULL,
    importe_cobro DECIMAL(10, 2) CHECK(importe_cobro > 0) NOT NULL
);

CREATE TABLE estado_venta(
	id_estado_venta INT PRIMARY KEY AUTO_INCREMENT,
    descripcion VARCHAR(30) NOT NULL,
    estado_registro TINYINT DEFAULT 1
);

CREATE TABLE metodo_pago(
	id_metodo_pago INT PRIMARY KEY AUTO_INCREMENT,
    descripcion VARCHAR(30) NOT NULL,
    estado_registro TINYINT DEFAULT 1
);

CREATE TABLE producto(
	id_producto INT PRIMARY KEY AUTO_INCREMENT,
    cod_producto VARCHAR(50) NOT NULL,
    nombre_producto VARCHAR(50) NOT NULL,
    id_categoria_producto INT NOT NULL,
    descripcion VARCHAR(100),
    precio DECIMAL(10, 2) CHECK(precio >= 0) NOT NULL,
    estado_registro TINYINT DEFAULT 1
);

CREATE TABLE categoria_producto(
	id_categoria_producto INT PRIMARY KEY AUTO_INCREMENT,
    descripcion VARCHAR(30) NOT NULL,
    estado_registro TINYINT DEFAULT 1
);

CREATE TABLE cliente(
	id_cliente INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    razon_social VARCHAR(50),
    domicilio VARCHAR(100) NOT NULL,
    telefono VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    activo TINYINT DEFAULT 1
);

CREATE TABLE inventario(
	id_mercaderia INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    stock INT CHECK(stock >= 0) NOT NULL,
    estado_registro TINYINT DEFAULT 1
);

CREATE TABLE ingreso_mercaderia(
	id_mercaderia INT NOT NULL,
    fecha_ingreso DATETIME,
    cantidad INT CHECK(cantidad > 0) NOT NULL,
    estado_registro TINYINT DEFAULT 1
);

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
    descripcion VARCHAR(100) NOT NULL,
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
    contraseña VARCHAR(200) NOT NULL,
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
/* PEDIDOS */
ALTER TABLE pedido
ADD CONSTRAINT fk_pedido_cliente
FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente);

ALTER TABLE pedido
ADD CONSTRAINT fk_pedido_estado
FOREIGN KEY (id_estado_pedido) REFERENCES estado_pedido(id_estado_pedido);

ALTER TABLE pedido
ADD CONSTRAINT fk_pedido_metodo
FOREIGN KEY (id_metodo_pago) REFERENCES metodo_pago(id_metodo_pago);

/* PRODUCTO */
ALTER TABLE producto
ADD CONSTRAINT fk_producto_categoria
FOREIGN KEY (id_categoria_producto) REFERENCES categoria_producto(id_categoria_producto);

/* DETALLE PEDIDO */
ALTER TABLE detalle_pedido
ADD CONSTRAINT fk_detalle_nro_pedido
FOREIGN KEY (nro_pedido) REFERENCES pedido(nro_pedido);

ALTER TABLE detalle_pedido
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

/* INGRESO MERCADERIA */
ALTER TABLE ingreso_mercaderia
ADD CONSTRAINT fk_ingreso_inventario
FOREIGN KEY (id_mercaderia) REFERENCES inventario(id_mercaderia);

SET SQL_SAFE_UPDATES = 0;


