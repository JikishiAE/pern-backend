import { NextFunction, Request, Response } from 'express';
import { AddProductOrderDto, CreateOrderDto, GetIdDto, GetOrdersDto, RemoveProductOrderDto, User } from '../../domain';
import { plainToInstance } from 'class-transformer';
import { OrdersService } from '../../application';


export class OrdersController {

  //* DI
    constructor(
      private readonly _ordersService: OrdersService,
    ) {}

    private getUser(req: Request): User {
        const user = (req as Request & { user: User }).user;
        return user;
    }

    get = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

        const user = this.getUser(req);

        const getDto = plainToInstance(GetOrdersDto, req.body);
  
        try {
            const orders = await this._ordersService.get(getDto!, user);
            return res.json(orders);
        } catch (error) {
            next(error);
        }
    }

    create = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

        const user = this.getUser(req);

        const createDto = plainToInstance(CreateOrderDto, req.body);
  
        try {
            const newOrder = await this._ordersService.create(createDto!, user.id);
            return res.json(newOrder);
        } catch (error) {
            next(error);
        }
    }

    updateOrderProduct = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    
        const addDto = plainToInstance(AddProductOrderDto, req.body);

        const user = this.getUser(req);
    
        try {
            await this._ordersService.checkUser(user, addDto.id);

            const updatedOrder = await this._ordersService.addProduct(addDto!);

            return res.json(updatedOrder);
        } catch (error) {
            next(error);
        }
    }
    removeOrderProduct = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    
        const updateDto = plainToInstance(RemoveProductOrderDto, req.body);

        const user = this.getUser(req);
    
        try {
            await this._ordersService.checkUser(user, updateDto.id);

            const updatedOrder = await this._ordersService.removeProduct(updateDto!);

            return res.json(updatedOrder);
        } catch (error) {
            next(error);
        }
    }

    delete = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

        const deleteDto = plainToInstance(GetIdDto, req.body);

        const user = this.getUser(req);
  
        try {
            await this._ordersService.checkUser(user, deleteDto.id);

            await this._ordersService.delete(deleteDto.id);

            return res.json();
        } catch (error) {
            next(error);
        }
    }

} 