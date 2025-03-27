import { Router } from "express";
import { validateDto } from "../middlewares/validateDto.middleware";
import { AddProductOrderDto, CreateOrderDto, GetIdDto, GetOrdersDto, RemoveProductOrderDto } from "../../domain";
import { OrdersService } from "../../application";
import { authMiddleware } from "../middlewares/auth.middleware";
import { BusinessRepository, OrdersRepository } from "../../infrastructure";
import { OrdersController } from './orders.controller';
import { roleMiddleware } from "../middlewares/roles.middleware";

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
         * /api/orders/create:
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
        router.post('/create', roleMiddleware(['Cliente']), validateDto(CreateOrderDto), ordersController.create );

        /**
         * @openapi
         * /api/orders/update:
         *   put:
         *     tags:
         *       - Orders
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
         *               producto:
         *                 type: object
         *                 properties:
         *                   id: 
         *                     type: number
         *                   cantidad: 
         *                     type: number
         *     responses:
         *       200:
         *         description: Ordenes - update product
         *         content:
         *           application/json:
         *             example:
         *               { nombre: tienda... }
         *       401:
         *         description: Credenciales incorrectas
         */
        router.put('/update', roleMiddleware(['Cliente']), validateDto(AddProductOrderDto), ordersController.updateOrderProduct );

        /**
         * @openapi
         * /api/orders/remove:
         *   delete:
         *     tags:
         *       - Orders
         *     summary: Eliminar Producto
         *     description: Elimina un Producto con los datos proporcionados
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               id:
         *                 type: number
         *               producto_id:
         *                 type: number
         *     responses:
         *       200:
         *         description: Ordenes - delete product
         *         content:
         *           application/json:
         *             example:
         *               { nombre: tienda... }
         *       401:
         *         description: Credenciales incorrectas
         */
        router.delete('/remove', roleMiddleware(['Cliente']), validateDto(RemoveProductOrderDto), ordersController.removeOrderProduct );

        /**
         * @openapi
         * /api/orders/delete:
         *   delete:
         *     tags:
         *       - Orders
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
        router.delete('/delete', roleMiddleware(['Cliente']), validateDto(GetIdDto), ordersController.delete );
    
    
        return router;
    }
  
  
}