import { plainToInstance } from "class-transformer";
import { Request, Response, NextFunction } from "express";
import { CustomError } from "../../domain";

interface User {
    id: number;
    role: string;
}

export const checkPropertyMiddleware = (dtoClass: any) => (req: Request, res: Response, next: NextFunction) => {

    try {
        
        const user = (req as Request & { user: User }).user;

        const dtoInstance = plainToInstance(dtoClass, req.body) as InstanceType<typeof dtoClass>;

        if (!user) {
            throw CustomError.unauthorized("No autorizado, usuario no encontrado");
        }

        if (user.id !== dtoInstance?.id) {
            throw CustomError.forbidden("Acceso denegado: El recurso no te pertenece");
        }

        next();

    } catch (error) {
        next(error);
    }

};
