import { Router } from "express";
import { validateDto } from "../middlewares/validateDto.middleware";
import { GetIdDto, CreateBusinessDto, GetBusinessDto, UpdateBusinessDto } from "../../domain";
import { BusinessService } from "../../application";
import { authMiddleware } from "../middlewares/auth.middleware";
import { BusinessRepository } from "../../infrastructure";
import { BusinessController } from './business.controller';
import { roleMiddleware } from "../middlewares/roles.middleware";

export class BusinessRoutes {


    static get routes(): Router {
  
        const router = Router();

        const businessRepository = new BusinessRepository();
        const businessService = new BusinessService(businessRepository);
        const businessController = new BusinessController(businessService);

        router.use(authMiddleware);
        router.use(roleMiddleware(['Negocio']));

        /**
         * @openapi
         * /api/business/getBusiness:
         *   post:
         *     tags:
         *       - Business
         *     summary: Obtener Negocios
         *     description: Obtiene una lista de negocios según los filtros proporcionados
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
         *         description: Negocios
         *         content:
         *           application/json:
         *             example:
         *               [{ nombre: Tienda... }]
         *       404:
         *         description: No se encontraron Negocios
         *       401:
         *         description: Credenciales incorrectas
         */
        router.post('/getBusiness', validateDto(GetBusinessDto), businessController.get );
    
        /**
         * @openapi
         * /api/business/create:
         *   post:
         *     tags:
         *       - Business
         *     summary: Crear Negocio
         *     description: Crea un negocio con los datos proporcionados
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               nombre:
         *                 type: string
         *               propietario_id:
         *                 type: number
         *     responses:
         *       200:
         *         description: Negocios
         *         content:
         *           application/json:
         *             example:
         *               { nombre: tienda... }
         *       401:
         *         description: Credenciales incorrectas
         */
        router.post('/create', validateDto(CreateBusinessDto), businessController.create );

        /**
         * @openapi
         * /api/business/update:
         *   put:
         *     tags:
         *       - Business
         *     summary: Actualizar Negocio
         *     description: Actualiza un negocio con los datos proporcionados
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
         *               propietario_id:
         *                 type: number
         *     responses:
         *       200:
         *         description: Negocios
         *         content:
         *           application/json:
         *             example:
         *               { nombre: tienda... }
         *       401:
         *         description: Credenciales incorrectas
         */
        router.put('/update', validateDto(UpdateBusinessDto), businessController.update );

        /**
         * @openapi
         * /api/business/delete:
         *   delete:
         *     tags:
         *       - Business
         *     summary: Eliminar Negocio
         *     description: Elimina un negocio de manera lógica
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
         *         description: Negocio Eliminado
         *       401:
         *         description: Credenciales incorrectas
         */
        router.delete('/delete', validateDto(GetIdDto), businessController.delete );
    
    
        return router;
    }
  
  
}