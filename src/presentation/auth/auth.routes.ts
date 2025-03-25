import { Router } from "express";
import { AuthService } from "../../application/services/auth.service";
import { AuthController } from "./auth.controller";
import { UsersRepository } from "../../infrastructure/repositories/users/users.repository";

export class AuthRoutes {


    static get routes(): Router {
  
      const router = Router();

      const usersRepository = new UsersRepository();
      const authService = new AuthService(usersRepository);
      const authController = new AuthController(authService);
  
      router.post('/register', authController.registerUser );
      router.post('/login', authController.loginUser );
  
  
      return router;
    }
  
  
  }