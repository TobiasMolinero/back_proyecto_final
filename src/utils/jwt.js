import pkg_jwt from "jsonwebtoken";

const {sign, verify} = pkg_jwt;
const JWT_SECRET = process.env.JWT_SECRET || 'tobi24';

export const generateToken = (id) => {
    const jwt = sign({id}, JWT_SECRET, {expiresIn: '12h'});
    return jwt;
};

export const verifyToken = (jwt) => {
    const isOk = verify(jwt, JWT_SECRET);
    return isOk; 
}