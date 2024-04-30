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