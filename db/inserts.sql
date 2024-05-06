/* INSERTS */

/* Roles de usuario */
INSERT INTO rol_usuario(descripcion)
VALUES('admin'),('empleado');
SELECT * FROM rol_usuario;

/* INSERT INTO persona(nombre, apellido, correo, telefono)
VALUES('Tobias', 'Molinero', 'tobiasmolinero98@gmail.com', '3815673581');
SELECT * FROM persona;

INSERT INTO usuario(usuario, contraseña, id_rol_usuario, id_persona)
VALUES('TobiasM', '12345', 1, 1);
SELECT * FROM usuario;

DELETE FROM persona WHERE id_persona = 1; */

/* Estado pedido */
SELECT * FROM estado_pedido;

/* Cliente */
SELECT * FROM cliente;


/* Categoria producto */
UPDATE categoria_producto SET estado_registro = 1 WHERE id_categoria_producto = 1;
SELECT * FROM categoria_producto;

/* Producto */
SELECT * FROM producto;

/* Pedido */
INSERT INTO pedido(nro_pedido, fecha, id_cliente, id_estado_pedido, observaciones, importe_total)
VALUES(1, '2024-05-06', 1, 3, '', 4000);
SELECT * FROM pedido;

/* detalle pedido*/
SELECT * FROM detalle_pedido;
DELETE FROM detalle_pedido