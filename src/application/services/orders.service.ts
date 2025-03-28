import { AddProductOrderDto, CreateOrderDto, CustomError, GetOrdersDto, IFilterIds, OrderEntity, RemoveProductOrderDto, User } from "../../domain";
import { BusinessRepository, OrdersRepository } from "../../infrastructure";

export class OrdersService {

    constructor(
        private readonly _ordersRepository: OrdersRepository,
        private readonly _businessRepository: BusinessRepository,
    ) {}
    
    public async checkUser(user: User, id_order: number) {
        const order = await this._ordersRepository.findById(id_order);

        if ( !order ) {
            throw CustomError.notFound("No se ha encontrado la orden");
        }

        if (user.role === 'Cliente') {
            if (user.id !== order?.id_user) throw CustomError.forbidden("No tienes acceso a esta orden");
        }
        // else if (user.role === 'Negocio') {
        //     const business = await this._businessRepository.findById(order?.id_business);
        //     if (user.id !== business?.id_owner) throw CustomError.forbidden("No tienes acceso a esta orden");
        // }
        else {
            throw CustomError.forbidden("Usuario inválido");
        }
    }
    public async checkOrderAvailability(id_order: number) {
        const order = await this._ordersRepository.findById(id_order);

        if ( !order ) {
            throw CustomError.notFound("No se ha encontrado la orden");
        }

        if (order.id_status !== 1) {
            throw CustomError.badRequest("Esta orden no se puede editar");
        }
    }
    public async get(filters: GetOrdersDto, user: User): Promise<OrderEntity[]> {
        try {

            let filterIds: IFilterIds = {};

            if (user.role === 'Cliente') {
                filterIds.id_user = user.id;
            }
            else if (user.role === 'Negocio') {
                const business = await this._businessRepository.findById(filters.negocio_id);

                if (business?.id_owner !== user.id) throw CustomError.forbidden("No tienes acceso a este recurso");

                filterIds.id_business = filters.negocio_id;
            }
            else {
                throw CustomError.unauthorized("Usuario inválido");
            }

            const foundOrders = await this._ordersRepository.get({
                ...filters
            }, filterIds);
        
            if ( !foundOrders ) throw CustomError.notFound('No se encontraron registros');

            return foundOrders;

        } catch (error) {
            throw error;
        }
    }
    public async create(item: CreateOrderDto, userId: number): Promise<OrderEntity> {
        try {
        
            const newEntity = await this._ordersRepository.create(item, userId);
        
            return newEntity;
        
        } catch (error) {
            throw error;
        }
    }
    public async addProduct(item: AddProductOrderDto): Promise<OrderEntity> {
        try {
        
            const updatedEntity = await this._ordersRepository.addProduct(item);
        
            return updatedEntity;
        
        } catch (error) {
            throw error;
        }
    }
    public async removeProduct(item: RemoveProductOrderDto): Promise<OrderEntity> {
        try {
        
            const updatedEntity = await this._ordersRepository.removeProduct(item);
        
            return updatedEntity;
        
        } catch (error) {
            throw error;
        }
    }
    public async delete(id: number): Promise<void> {
        try {

            await this._ordersRepository.delete(id);

        } catch (error) {
            throw error;
        }
    }
}