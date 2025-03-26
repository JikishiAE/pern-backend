import { NextFunction, Request, Response } from 'express';
import { GetUsersDto, UpdateUserDto, UserIdDto } from '../../domain';
import { plainToInstance } from 'class-transformer';
import { UsersService } from '../../application';


export class UsersController {

  //* DI
    constructor(
      private readonly _usersService: UsersService,
    ) {}

    getUsers = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

        const registerDto = plainToInstance(GetUsersDto, req.body);
  
        try {
            const user = await this._usersService.getUsers(registerDto!);
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }

    updateUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

        const updateUserDto = plainToInstance(UpdateUserDto, req.body);
  
        try {
            const user = await this._usersService.updateUser(updateUserDto!);
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }

    deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

        const deleteUserDto = plainToInstance(UserIdDto, req.body);
  
        try {
            await this._usersService.deleteUser(deleteUserDto!);
            return res.json();
        } catch (error) {
            next(error);
        }
    }

} 