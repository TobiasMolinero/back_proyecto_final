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