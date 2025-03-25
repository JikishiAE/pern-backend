import { Request, Response, NextFunction } from "express";

interface User {
  role: string;
}

export const roleMiddleware = (allowedRoles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    const user = (req as Request & { user: User }).user;

    if (!user) {
        return res.status(401).json({ message: "No autorizado, usuario no encontrado" });
    }

    if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({ message: "Acceso denegado: No tienes el rol necesario" });
    }

    next();
};
