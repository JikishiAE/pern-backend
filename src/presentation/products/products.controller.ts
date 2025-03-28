import { NextFunction, Request, Response } from 'express';
import { GetIdDto, CreateProductDto, GetProductsDto, UpdateProductDto, User } from '../../domain';
import { plainToInstance } from 'class-transformer';
import { ProductsService } from '../../application';


export class ProductsController {

  //* DI
    constructor(
      private readonly _productService: ProductsService,
    ) {}

    private getUser(req: Request): User {
        const user = (req as Request & { user: User }).user;
        return user;
    }

    get = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

        const registerDto = plainToInstance(GetProductsDto, req.body);
  
        try {
            const user = await this._productService.get(registerDto!);
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }

    create = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

        const createDto = plainToInstance(CreateProductDto, req.body);

        createDto.user_id = this.getUser(req).id;
  
        try {
            const user = await this._productService.create(createDto!);
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }

    update = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

        const updateDto = plainToInstance(UpdateProductDto, req.body);

        updateDto.user_id = this.getUser(req).id;
  
        try {
            const user = await this._productService.update(updateDto!);
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }

    delete = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

        const deleteDto = plainToInstance(GetIdDto, req.body);

        const user_id = this.getUser(req).id;
  
        try {
            await this._productService.checkPropertyByIdProduct(deleteDto.id, user_id);

            await this._productService.delete(deleteDto.id);

            return res.json();
        } catch (error) {
            next(error);
        }
    }

} 