import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export const validateDto = (dtoClass: any) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const dtoInstance = plainToInstance(dtoClass, req.body);

    validate(dtoInstance, { whitelist: true, forbidNonWhitelisted: true }).then((errors) => {
      if (errors.length > 0) {
        const errorMessages = errors.map((err) => ({
          field: err.property,
          errors: Object.values(err.constraints || {}),
        }));

        res.status(400).json({
          message: "Datos inválidos",
          errors: errorMessages,
        });
      } else {
        next(); // Pasa al siguiente middleware/controlador
      }
    }).catch((error) => next(error)); // Manejo de errores inesperados
  };
};
