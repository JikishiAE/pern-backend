import express, { Router } from 'express';
import cors from 'cors';
import compression from 'compression';
import sequelize from '../db-connection';
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from '../swaggerConfig';
import { errorHandler } from './middlewares/errorHandler.middleware';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

interface Options {
  port: number;
  routes: Router;
}


export class Server {

  public readonly app = express();

  private serverListener?: any;

  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, routes } = options;
    this.port = port;
    this.routes = routes;
  }

  
  
  async start() {

    //* Sync DB
    try {
      await sequelize.sync();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }

    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 20,
      message: "Demasiadas peticiones, por favor intente más tarde.",
      headers: true,
    });

    //* Middlewares
    this.app.use( express.json() ); // raw
    this.app.use( express.urlencoded({ extended: true }) ); // x-www-form-urlencoded
    this.app.use( compression() )
    this.app.use(limiter);

    this.app.use(
      helmet.contentSecurityPolicy({
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'"],
          imgSrc: ["'self'", "data:"],
          connectSrc: ["'self'"],
          fontSrc: ["'self'"],
          objectSrc: ["'none'"],
        },
      })
    );

    //* Configurar CORS
    this.app.use(cors());

    const swaggerSpec = swaggerJsdoc(swaggerOptions);
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    //* Routes
    this.app.use('/api', this.routes );

    this.app.use(errorHandler);
    

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${ this.port }`);
    });

  }

  public close() {
    this.serverListener?.close();
  }

}