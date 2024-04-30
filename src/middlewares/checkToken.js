import { verifyToken } from "../utils/jwt.js";

export const checkToken = (req, res, next) => {
    try {
        const jwtByUser = req.headers.authorization || "";
        const jwt = jwtByUser.split(" ").pop();
        const isUser = verifyToken(`${jwt}`);
        req.user = isUser;
        next();
    } catch (error) {
        if(error.name === 'TokenExpiredError'){
            res.status(401).json({
                message: 'La sesión ha expirado. Vuelva a iniciar sesión.'
            });
        } else if(error.name === 'JsonWebTokenError'){
            res.status(401).json({
                message: 'Token no valido.'
            });
        } else {
            res.status(400).json({
                message: 'La sesión no es valida.'
            })
        }        
    }
};