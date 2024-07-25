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
SELECT u.id_usuario, p.id_persona, p.nombre, p.apellido, p.correo, p.telefono, u.usuario, u.contraseña, u.id_rol_usuario,ru.descripcion 'rol' FROM usuario u
JOIN persona p
ON u.id_persona = p.id_persona
JOIN rol_usuario ru
ON u.id_rol_usuario = ru.id_rol_usuario
WHERE u.activo = 1;

SELECT * FROM usuarios_persona;

/* Vista de los productos con sus categorias */
DROP VIEW productos;
CREATE VIEW productos AS
SELECT p.id_producto, p.cod_producto, p.nombre_producto, p.descripcion, p.precio, p.id_categoria_producto, cp.categoria_producto 'categoria' FROM producto p
JOIN categoria_producto cp
ON p.id_categoria_producto = cp.id_categoria_producto
WHERE p.estado_registro = 1;

SELECT * FROM productos;

/* Vista para el stock de productoss*/
DROP VIEW stock;
CREATE VIEW stock AS 
SELECT p.id_producto, p.cod_producto, p.nombre_producto, p.id_categoria_producto, i.stock FROM producto p
JOIN inventario i ON p.id_producto = i.id_producto
WHERE p.estado_registro = 1;

SELECT * FROM stock;

/* Vista para las ventas con su estado, metodo, tipo_factura y el cliente que hizo el pedido*/




/* VISTA DE LOS GASTOS CON SUS CATEGORIAS */
DROP VIEW gastos_varios;
CREATE VIEW gastos_varios AS
SELECT g.id_gasto, cg.id_categoria_gasto, cg.categoria as 'categoria', g.fecha, g.importe, g.detalle FROM gasto g
JOIN categoria_gasto cg
ON g.id_categoria_gasto = cg.id_categoria_gasto
WHERE g.estado_registro = 1;

SELECT * FROM gastos_varios;