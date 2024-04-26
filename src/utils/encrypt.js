import { hash, compare } from 'bcrypt';

// Crear el hash para la contraseña.
export const encrypt = async(pass) => {
    const passHash = await hash(pass, 8);
    return passHash;
}

// Verifica que la contraseña coincida con el hash que se creo anteriormente.
export const verified = async(pass, passHash) => {
    const verify = await compare(pass, passHash);
    return verify;
}