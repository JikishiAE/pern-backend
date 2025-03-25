import { Request, Response } from 'express';
import { CustomError, LoginUserDto, RegisterUserDto } from '../../domain';
import { AuthService } from '../../application/services/auth.service';


export class AuthController {

  //* DI
    constructor(
        private readonly _authService: AuthService,
    ) {}

    private handleError = ( res: Response, error: unknown ) => {
        if ( error instanceof CustomError ) {
          res.status(error.statusCode).json({ error: error.message });
          return;
        }
        
        res.status(500).json({ error: 'Internal server error - check logs' });
    }


    registerUser = async (req: Request, res: Response): Promise<any> => {
        const [error, registerDto] = RegisterUserDto.create(req.body);
        if (error) return res.status(400).json({ error });
    
        try {
          const user = await this._authService.registerUser(registerDto!);
          return res.json(user);
        } catch (error) {
          return this.handleError(res, error);
        }
    }

    loginUser = async (req: Request, res: Response): Promise<any> => {
        const [error, loginUserDto] = LoginUserDto.create(req.body);
        if ( error ) return res.status(400).json({error})
    
        try {
          const user = await this._authService.loginUser(loginUserDto!);
          return res.json(user);
        } catch (error) {
          return this.handleError(res, error);
        }
    }

} 