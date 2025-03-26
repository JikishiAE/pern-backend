import { Router } from "express";
import { AuthService } from "../../application/services/auth.service";
import { AuthController } from "./auth.controller";
import { UsersRepository } from "../../infrastructure/repositories/users/users.repository";
import { validateDto } from "../middlewares/validateDto.middleware";
import { LoginUserDto, RegisterUserDto, ValidateUserDto } from "../../domain";

export class AuthRoutes {


  static get routes(): Router {

    const router = Router();

    const usersRepository = new UsersRepository();
    const authService = new AuthService(usersRepository);
    const authController = new AuthController(authService);

    /**
     * @openapi
     * /api/auth/register:
     *   post:
     *     tags:
     *       - Auth
     *     summary: Registrar Usuario
     *     description: Registra un nuevo usuario y devuelve un token JWT.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *     responses:
     *       200:
     *         description: Registro exitoso
     *         content:
     *           application/json:
     *             example:
     *               user: { nombre: Jhon... }
     *               token: "eyJhbGciOiJIUzI1..."
     *       401:
     *         description: Credenciales incorrectas
     */
    router.post('/register', validateDto(RegisterUserDto), authController.registerUser );

    /**
     * @openapi
     * /api/auth/login:
     *   post:
     *     tags:
     *       - Auth
     *     summary: Iniciar sesión
     *     description: Autentica a un usuario y devuelve un token JWT.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *     responses:
     *       200:
     *         description: Login exitoso
     *         content:
     *           application/json:
     *             example:
     *               user: { nombre: Jhon... }
     *               token: "eyJhbGciOiJIUzI1..."
     *       401:
     *         description: Credenciales incorrectas
     */
    router.post('/login', validateDto(LoginUserDto), authController.loginUser );

    /**
     * @openapi
     * /api/auth/validate:
     *   post:
     *     tags:
     *       - Auth
     *     summary: Validar usuario
     *     description: Autentica a un usuario
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *     responses:
     *       200:
     *         description: Validación exitosa
     *       401:
     *         description: Credenciales incorrectas
     */
    router.post('/validate', validateDto(ValidateUserDto), authController.validateUser );


    return router;
  }
  
  
}