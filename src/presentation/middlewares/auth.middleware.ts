import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { envs } from "../../config";
import { CustomError } from "../../domain";

interface DecodedToken {
  id: string;
  role: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    
    try {
        const token = req.headers["authorization"];

        if (!token) {
            throw CustomError.unauthorized("No autorizado");
        }    

        try {
            const decoded = jwt.verify(token.split(" ")[1], envs.JWT_SEED as string) as DecodedToken;
    
            (req as Request & { user: DecodedToken }).user = decoded;
    
            next();
        } catch (error) {
            throw CustomError.forbidden("Token inválido");
        }
        
    } catch (error) {
        next(error);
    }
    
};
