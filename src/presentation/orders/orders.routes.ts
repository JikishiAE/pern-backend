import { Router } from "express";
import { validateDto } from "../middlewares/validateDto.middleware";
import { CreateOrderDto, GetIdDto, GetOrdersDto } from "../../domain";
import { OrdersService } from "../../application";
import { authMiddleware } from "../middlewares/auth.middleware";
import { BusinessRepository, OrdersRepository } from "../../infrastructure";
import { OrdersController } from './orders.controller';

export class OrdersRoutes {


    static get routes(): Router {
  
        const router = Router();

        const businessRepository = new BusinessRepository();
        
        const ordersRepository = new OrdersRepository();
        const ordersService = new OrdersService(ordersRepository, businessRepository);
        const ordersController = new OrdersController(ordersService);

        router.use(authMiddleware);

        /**
         * @openapi
         * /api/orders/getOrders:
         *   post:
         *     tags:
         *       - Orders
         *     summary: Obtener Ordenes
         *     description: Obtiene una lista de ordenes según los filtros proporcionados
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               id:
         *                 type: number
         *               nombre:
         *                 type: string
         *     responses:
         *       200:
         *         description: Ordenes
         *         content:
         *           application/json:
         *             example:
         *               [{ nombre: Tienda... }]
         *       404:
         *         description: No se encontraron Ordenes
         *       401:
         *         description: Credenciales incorrectas
         */
        router.post('/getOrders', validateDto(GetOrdersDto), ordersController.get );

        /**
         * @openapi
         * /api/products/create:
         *   post:
         *     tags:
         *       - Orders
         *     summary: Crear Orden
         *     description: Crea una Orden con los datos proporcionados
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               negocio_id:
         *                 type: number
         *               productos:
         *                 type: object
         *                 properties:
         *                   id: 
         *                     type: number
         *                   cantidad: 
         *                     type: number
         *     responses:
         *       200:
         *         description: Ordenes
         *         content:
         *           application/json:
         *             example:
         *               { nombre: tienda... }
         *       401:
         *         description: Credenciales incorrectas
         */
        router.post('/create', validateDto(CreateOrderDto), ordersController.create );

        /**
         * @openapi
         * /api/products/update:
         *   put:
         *     tags:
         *       - Products
         *     summary: Actualizar Producto
         *     description: Actualiza un Producto con los datos proporcionados
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               id:
         *                 type: number
         *               nombre:
         *                 type: string
         *               negocio_id:
         *                 type: number
         *               cantidad:
         *                 type: number
         *               precio:
         *                 type: number
         *     responses:
         *       200:
         *         description: Ordenes
         *         content:
         *           application/json:
         *             example:
         *               { nombre: tienda... }
         *       401:
         *         description: Credenciales incorrectas
         */
        //router.put('/update', validateDto(UpdateProductDto), productController.update );

        /**
         * @openapi
         * /api/products/delete:
         *   delete:
         *     tags:
         *       - Products
         *     summary: Eliminar Orden
         *     description: Elimina una Orden de manera lógica
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               id:
         *                 type: number
         *     responses:
         *       200:
         *         description: Orden Eliminada
         *       401:
         *         description: Credenciales incorrectas
         */
        router.delete('/delete', validateDto(GetIdDto), ordersController.delete );
    
    
        return router;
    }
  
  
}