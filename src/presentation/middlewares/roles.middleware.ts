import { Request, Response, NextFunction } from "express";
import { CustomError, User } from "../../domain";

export const roleMiddleware = (allowedRoles: string[]) => (req: Request, res: Response, next: NextFunction) => {

    try {
        const user = (req as Request & { user: User }).user;

        if (!user) {
            throw CustomError.unauthorized("No autorizado, usuario no encontrado");
        }

        if (!allowedRoles.includes(user.role)) {
            throw CustomError.forbidden("Acceso denegado: No tienes el rol necesario");
        }

        next();
    } catch (error) {
        next(error);
    }
    
};
