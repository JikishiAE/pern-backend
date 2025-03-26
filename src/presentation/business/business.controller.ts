import { NextFunction, Request, Response } from 'express';
import { BusinessIdDto, CreateBusinessDto, GetBusinessDto, UpdateBusinessDto } from '../../domain';
import { plainToInstance } from 'class-transformer';
import { BusinessService } from '../../application';


export class BusinessController {

  //* DI
    constructor(
      private readonly _businessService: BusinessService,
    ) {}

    get = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

        const registerDto = plainToInstance(GetBusinessDto, req.body);
  
        try {
            const user = await this._businessService.get(registerDto!);
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }

    create = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

        const createDto = plainToInstance(CreateBusinessDto, req.body);
  
        try {
            const user = await this._businessService.create(createDto!);
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }

    update = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

        const updateDto = plainToInstance(UpdateBusinessDto, req.body);
  
        try {
            const user = await this._businessService.update(updateDto!);
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }

    delete = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

        const deleteDto = plainToInstance(BusinessIdDto, req.body);
  
        try {
            await this._businessService.delete(deleteDto.id);
            return res.json();
        } catch (error) {
            next(error);
        }
    }

} 