import { Op } from "sequelize";
import { ProductEntity, CreateProductDto, CustomError, GetProductsDto, IRepository, UpdateProductDto } from "../../../domain";
import Producto from "../../../models/producto.model";

export class ProductsRepository implements IRepository
    <
        ProductEntity, 
        GetProductsDto,
        CreateProductDto, 
        UpdateProductDto
    > 
{

    public async get(filters: GetProductsDto): Promise<ProductEntity[]> {
        try {
        
            const whereConditions = Object.entries(filters)
                .filter(([_, value]) => value !== undefined && value !== null && value !== '')
                .map(([key, value]) => {
                    
                    if (typeof value === 'string') {
                        return { [key]: { [Op.like]: `%${value}%` } };
                    } else {
                        return { [key]: value };
                    }
                });

            const users = await Producto.findAll({
                where: whereConditions.length ? { [Op.or]: whereConditions } : undefined,
            });

            const usersArray = users.map((user) => {
                try {
                    return ProductEntity.fromObject(user);
                } catch (error) {
                    throw error;
                }
            });
            
            return usersArray;
        }
        catch (error) {
            throw error;
        }
    }
    
    public async findById(id: number): Promise<ProductEntity | null> {
        try {
            const existUser = await Producto.findOne({
                where: { id }
            });

            return existUser ? ProductEntity.fromObject(existUser) : null;
        }
        catch (error) {
            throw error;
        }
    }

    public async findByName(name: string): Promise<ProductEntity | null> {
        try {
            const existUser = await Producto.findOne({
                where: { nombre: name }
            });

            return existUser ? ProductEntity.fromObject(existUser) : null;
        }
        catch (error) {
            throw error;
        }
    }


    public async create(item: CreateProductDto): Promise<ProductEntity> {
        try {
            const register = Producto.build({
                ...item
            });
    
            await register.save();
    
            return ProductEntity.fromObject(register);
        }
        catch (error) {
            throw error;
        }
    }

    public async update(item: UpdateProductDto): Promise<ProductEntity> {
        try {

            const register = await Producto.findByPk(item.id);
            if (!register) {
                throw CustomError.notFound("Producto no encontrado");
            }

            const cleanData = Object.fromEntries(
                Object.entries(item).filter(([_, value]) => value !== undefined && value !== null && value !== '')
            );
        
            // Si no hay datos para actualizar, devolvemos el usuario sin modificar
            if (Object.keys(cleanData).length === 0) return ProductEntity.fromObject(register);
        
            // Actualizamos solo los campos que llegaron
            await register.update(cleanData);
    
            return ProductEntity.fromObject(register);
        }
        catch (error) {
            throw error;
        }
    }

    public async delete(id: number) {
        try {

            await Producto.destroy({ where: { id } });

        }
        catch (error) {
            throw error;
        }
    }
}