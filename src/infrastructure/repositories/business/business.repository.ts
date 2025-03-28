import { Op } from "sequelize";
import { BusinessEntity, CreateBusinessDto, CustomError, GetBusinessDto, IRepository, UpdateBusinessDto } from "../../../domain";
import Negocio from "../../../models/negocio.model";

export class BusinessRepository implements IRepository
    <
        BusinessEntity, 
        GetBusinessDto,
        CreateBusinessDto, 
        UpdateBusinessDto
    > 
{


    public async get(filters: GetBusinessDto): Promise<BusinessEntity[]> {
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

            const users = await Negocio.findAll({
                where: whereConditions.length ? { [Op.or]: whereConditions } : undefined,
            });

            const usersArray = users.map((user) => {
                try {
                    return BusinessEntity.fromObject(user);
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
    
    public async findById(id: number): Promise<BusinessEntity | null> {
        try {
            const existUser = await Negocio.findOne({
                where: { id }
            });

            return existUser ? BusinessEntity.fromObject(existUser) : null;
        }
        catch (error) {
            throw error;
        }
    }

    public async findByName(name: string): Promise<BusinessEntity | null> {
        try {
            const existUser = await Negocio.findOne({
                where: { nombre: name }
            });

            return existUser ? BusinessEntity.fromObject(existUser) : null;
        }
        catch (error) {
            throw error;
        }
    }


    public async create(item: CreateBusinessDto): Promise<BusinessEntity> {
        try {
            const register = Negocio.build({
                ...item
            });
    
            await register.save();
    
            return BusinessEntity.fromObject(register);
        }
        catch (error) {
            throw error;
        }
    }

    public async update(item: UpdateBusinessDto): Promise<BusinessEntity> {
        try {

            const register = await Negocio.findByPk(item.id);
            if (!register) {
                throw CustomError.notFound("Negocio no encontrado");
            }

            const cleanData = Object.fromEntries(
                Object.entries(item).filter(([_, value]) => value !== undefined && value !== null && value !== '')
            );
        
            // Si no hay datos para actualizar, devolvemos el usuario sin modificar
            if (Object.keys(cleanData).length === 0) return BusinessEntity.fromObject(register);
        
            // Actualizamos solo los campos que llegaron
            await register.update(cleanData);
    
            return BusinessEntity.fromObject(register);
        }
        catch (error) {
            throw error;
        }
    }

    public async delete(id: number) {
        try {

            await Negocio.destroy({ where: { id } });

        }
        catch (error) {
            throw error;
        }
    }
}