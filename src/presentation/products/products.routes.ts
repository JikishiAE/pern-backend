import { Router } from "express";
import { validateDto } from "../middlewares/validateDto.middleware";
import { GetIdDto, CreateProductDto, GetProductsDto, UpdateProductDto } from "../../domain";
import { ProductsService } from "../../application";
import { authMiddleware } from "../middlewares/auth.middleware";
import { BusinessRepository, ProductsRepository } from "../../infrastructure";
import { ProductsController } from './products.controller';
import { roleMiddleware } from "../middlewares/roles.middleware";

export class ProductsRoutes {


    static get routes(): Router {
  
        const router = Router();

        const businessRepository = new BusinessRepository();
        
        const productRepository = new ProductsRepository();
        const productService = new ProductsService(productRepository, businessRepository);
        const productController = new ProductsController(productService);

        router.use(authMiddleware);

        /**
         * @openapi
         * /api/products/getProducts:
         *   post:
         *     tags:
         *       - Products
         *     summary: Obtener Productos
         *     description: Obtiene una lista de productos según los filtros proporcionados
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
         *         description: Productos
         *         content:
         *           application/json:
         *             example:
         *               [{ nombre: Tienda... }]
         *       404:
         *         description: No se encontraron Productos
         *       401:
         *         description: Credenciales incorrectas
         */
        router.post('/getProducts', validateDto(GetProductsDto), productController.get );
    
        router.use(roleMiddleware(['Negocio']));

        /**
         * @openapi
         * /api/products/create:
         *   post:
         *     tags:
         *       - Products
         *     summary: Crear Producto
         *     description: Crea un Producto con los datos proporcionados
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
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
         *         description: Productos
         *         content:
         *           application/json:
         *             example:
         *               { nombre: tienda... }
         *       401:
         *         description: Credenciales incorrectas
         */
        router.post('/create', validateDto(CreateProductDto), productController.create );

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
         *         description: Productos
         *         content:
         *           application/json:
         *             example:
         *               { nombre: tienda... }
         *       401:
         *         description: Credenciales incorrectas
         */
        router.put('/update', validateDto(UpdateProductDto), productController.update );

        /**
         * @openapi
         * /api/products/delete:
         *   delete:
         *     tags:
         *       - Products
         *     summary: Eliminar Producto
         *     description: Elimina un Producto de manera lógica
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
         *         description: Producto Eliminado
         *       401:
         *         description: Credenciales incorrectas
         */
        router.delete('/delete', validateDto(GetIdDto), productController.delete );
    
    
        return router;
    }
  
  
}