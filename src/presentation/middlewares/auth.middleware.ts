import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { envs } from "../../config";

interface DecodedToken {
  id: string;
  role: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"];
    
    if (!token) {
        return res.status(401).json({ message: "No autorizado" });
    }

    try {
        const decoded = jwt.verify(token.split(" ")[1], envs.JWT_SEED as string) as DecodedToken;

        (req as Request & { user: DecodedToken }).user = decoded;

        next();
    } catch (error) {
        return res.status(403).json({ message: "Token inválido" });
    }
};
