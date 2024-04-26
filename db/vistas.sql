/* VISTAS */
DROP VIEW usuarios;
CREATE VIEW usuarios AS
SELECT u.id_usuario, u.usuario, u.contraseña, ru.descripcion 'rol' FROM usuario u
JOIN rol_usuario ru
ON u.id_rol_usuario = ru.id_rol_usuario
WHERE u.activo = 1;

SELECT * FROM usuarios;