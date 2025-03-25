import { Request, Response, NextFunction } from "express";
import { CustomError } from "../../domain";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {

    if ( err instanceof CustomError ) {
        res.status(err.statusCode).json({ error: err.message });
        return;
    }
    console.log(err);

    res.status(500).json({ error: 'Internal server error - check logs' });

};
