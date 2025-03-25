import { NextFunction, Request, Response } from 'express';
import { LoginUserDto, RegisterUserDto } from '../../domain';
import { AuthService } from '../../application/services/auth.service';
import { plainToInstance } from 'class-transformer';


export class AuthController {

  //* DI
    constructor(
      private readonly _authService: AuthService,
    ) {}

    registerUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

      const registerDto = plainToInstance(RegisterUserDto, req.body);
  
      try {
        const user = await this._authService.registerUser(registerDto!);
        return res.json(user);
      } catch (error) {
        next(error);
      }
    }

    loginUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

      const loginUserDto = plainToInstance(LoginUserDto, req.body);
  
      try {
        const user = await this._authService.loginUser(loginUserDto!);
        return res.json(user);
      } catch (error) {
        next(error);
      }
    }

} 