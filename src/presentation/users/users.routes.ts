import { Router } from "express";
import { UsersRepository } from "../../infrastructure/repositories/users/users.repository";
import { validateDto } from "../middlewares/validateDto.middleware";
import { GetUsersDto, UpdateUserDto, UserIdDto } from "../../domain";
import { UsersService } from "../../application";
import { UsersController } from "./users.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { checkPropertyMiddleware } from "../middlewares/checkProperty.middleware";

export class UserRoutes {


    static get routes(): Router {
  
        const router = Router();

        const usersRepository = new UsersRepository();
        const usersService = new UsersService(usersRepository);
        const usersController = new UsersController(usersService);

        router.use(authMiddleware);

        /**
         * @openapi
         * /api/users/getUsers:
         *   post:
         *     tags:
         *       - Users
         *     summary: Obtener Usuarios
         *     description: Obtiene una lista de usuarios según los filtros proporcionados
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
         *               correo:
         *                 type: string
         *     responses:
         *       200:
         *         description: Usuarios
         *         content:
         *           application/json:
         *             example:
         *               user: [{ nombre: Jhon... }]
         *       404:
         *         description: No se encontraron usuarios
         *       401:
         *         description: Credenciales incorrectas
         */
        router.post('/getUsers', validateDto(GetUsersDto), usersController.getUsers );
    
        /**
         * @openapi
         * /api/users/update:
         *   put:
         *     tags:
         *       - Users
         *     summary: Actualizar Usuario
         *     description: Actualiza un usuario con los datos proporcionados
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
         *               correo:
         *                 type: string
         *               contrasena:
         *                 type: string
         *               rol:
         *                 type: string
         *     responses:
         *       200:
         *         description: Usuarios
         *         content:
         *           application/json:
         *             example:
         *               user: [{ nombre: Jhon... }]
         *       401:
         *         description: Credenciales incorrectas
         */
        router.put('/update', validateDto(UpdateUserDto), checkPropertyMiddleware(UpdateUserDto), usersController.updateUser );

        /**
         * @openapi
         * /api/users/delete:
         *   delete:
         *     tags:
         *       - Users
         *     summary: Eliminar Usuario
         *     description: Elimina un usuario de manera lógica
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
         *         description: Usuario Eliminado
         *       401:
         *         description: Credenciales incorrectas
         */
        router.delete('/delete', validateDto(UserIdDto), usersController.deleteUser );
    
    
        return router;
    }
  
  
}