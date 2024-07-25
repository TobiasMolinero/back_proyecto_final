/* INSERTS */

/* Roles de usuario */
INSERT INTO rol_usuario(descripcion)
VALUES('admin'),('empleado');

SELECT * FROM rol_usuario;

INSERT INTO persona(nombre, apellido, correo, telefono)
VALUES('Tobias', 'Molinero', 'tobiasmolinero98@gmail.com', '3815673581');
SELECT * FROM persona;

INSERT INTO usuario(usuario, contraseña, id_rol_usuario, id_persona)
VALUES('TobiasM', '12345', 1, 1);
SELECT * FROM usuario;

/* DELETE FROM persona WHERE id_persona = 5; */ 

/* Estado pedido */
INSERT INTO estado_pedido(nombre, descripcion)
VALUES('Confirmado', 'El pedido ha sido confirmado por el vendedor y esta listo para ser procesado.'),
('Preparación', 'El pedido esta siendo preparado.'),
('En transito', 'El pedido fue enviado y esta en camino hacia el cliente.'),
('Retira el cliente', 'El cliente retira su pedido.'),
('Entregado', 'El pedido fue entregado al cliente.'),
('Cancelado', 'El pedido fue cancelado por el vendedor o el cliente.');
SELECT * FROM estado_pedido;

/* Cliente */
SELECT * FROM cliente;
UPDATE cliente SET activo = 1;

/* Categoria producto */
UPDATE categoria_producto SET estado_registro = 1 WHERE id_categoria_producto = 1;
SELECT * FROM categoria_producto;

/* Producto */
SELECT * FROM producto;

UPDATE producto SET estado_registro = 1
WHERE id_producto = 1;

/* Pedido */
INSERT INTO pedido(nro_pedido, fecha, id_cliente, id_estado_pedido, observaciones, importe_total)
VALUES(1, '2024-05-06', 1, 3, '', 4000);
SELECT * FROM pedido;

/* detalle pedido*/
SELECT * FROM detalle_pedido;
DELETE FROM detalle_pedidos;

/* GASTOS */
INSERT INTO gasto(id_categoria_gasto, fecha, importe)
VALUES(1, '2024-06-07', 10000);

SELECT * FROM gasto;

/* CATEGORIA GASTOS */
INSERT INTO categoria_gasto(categoria)
VALUES('Sueldos'),('varios'),('Libreria'),('Cadetes');

SELECT * FROM categoria_gasto;

/* INVENTARIO */
INSERT INTO inventario(id_producto)
VALUES(2);
SELECT * FROM inventario;

DELETE FROM inventario WHERE id_producto = 1;