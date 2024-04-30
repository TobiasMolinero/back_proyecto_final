/* VISTAS */
DROP VIEW usuarios;
CREATE VIEW usuarios AS
SELECT u.id_usuario, p.id_persona, p.nombre, p.apellido, p.correo, p.telefono, u.usuario, u.contraseña, ru.descripcion 'rol' FROM usuario u
JOIN persona p
ON u.id_persona = p.id_persona
JOIN rol_usuario ru
ON u.id_rol_usuario = ru.id_rol_usuario
WHERE u.activo = 1;

SELECT * FROM usuarios;