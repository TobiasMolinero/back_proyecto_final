/* VISTAS */
/* Vista para usuarios sin los datos de la persona a la que corresponde el usuario */
DROP VIEW usuarios;
CREATE VIEW usuarios AS
SELECT u.id_usuario, u.usuario, u.contraseña, ru.descripcion 'rol' FROM usuario u
JOIN rol_usuario ru
ON u.id_rol_usuario = ru.id_rol_usuario
WHERE u.activo = 1;

SELECT * FROM usuarios;

/* Vista para los usuarios con los datos de su persona correspondiente */
DROP VIEW usuarios_persona;
CREATE VIEW usuarios_persona AS
SELECT u.id_usuario, p.id_persona, p.nombre, p.apellido, p.correo, p.telefono, u.usuario, u.contraseña, ru.descripcion 'rol' FROM usuario u
JOIN persona p
ON u.id_persona = p.id_persona
JOIN rol_usuario ru
ON u.id_rol_usuario = ru.id_rol_usuario
WHERE u.activo = 1;

SELECT * FROM usuarios_persona;

/* Vista de los productos con sus categorias */
DROP VIEW productos;
CREATE VIEW productos AS
SELECT p.id_producto, p.cod_producto, p.nombre_producto, p.descripcion, p.precio, cp.descripcion 'categoria' FROM producto p
JOIN categoria_producto cp
ON p.id_categoria_producto = cp.id_categoria_producto
WHERE p.estado_registro = 1;

SELECT * FROM productos;

/* Vista para los pedidos con su estado y el cliente que hizo el pedido*/

/* Vista para las ventas con su estado, el metodo de pago y nro de pedido al que corresponde*/