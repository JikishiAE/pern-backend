import { Op } from "sequelize";
import { CustomError, RegisterUserDto, UpdateUserDto, UserEntity } from "../../../domain";
import Usuario from "../../../models/usuario.model";

export class UsersRepository {

    public async validateUser(email: string) {
        try {
            const existUser = await Usuario.update(
                {
                    es_verificado: true
                },
                {
                    where: { correo: email }
                }
            );
        }
        catch (error) {
            throw error;
        }
    }
    
    public async findById(id: number): Promise<UserEntity | null> {
        try {
            const existUser = await Usuario.findOne({
                where: { id }
            });

            return existUser ? UserEntity.fromObject(existUser) : null;
        }
        catch (error) {
            throw error;
        }
    }

    public async findByEmail(email: string): Promise<UserEntity | null> {
        try {
            const existUser = await Usuario.findOne({
                where: { correo: email }
            });

            return existUser ? UserEntity.fromObject(existUser) : null;
        }
        catch (error) {
            throw error;
        }
    }

    public async findUsers(filters: {
        id?: number,
        nombre?: string,
        correo?: string,
    }
    ): Promise<UserEntity[] | null> {

        try {

            const whereConditions = Object.entries(filters)
                .filter(([_, value]) => value !== undefined && value !== null && value !== '')
                .map(([key, value]) => ({ [key]: value })); 

            const users = await Usuario.findAll({
                attributes: ['id', 'nombre', 'correo', 'es_verificado', 'rol'],
                where: whereConditions.length ? { [Op.or]: whereConditions } : undefined,
            });

            const usersArray = users.map((user) => {
                try {
                    return UserEntity.fromObject(user);
                } catch (error) {
                    throw error;
                }
            });
          
            return users ? usersArray : null;
        }
        catch (error) {
            throw error;
        }

    }

    public async registerUser(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        try {
            const user = Usuario.build({
                ...registerUserDto
            });
    
            await user.save();
    
            return UserEntity.fromObject(user);
        }
        catch (error) {
            throw error;
        }
    }

    public async updateUser(updateUserDto: UpdateUserDto): Promise<UserEntity> {
        try {

            const user = await Usuario.findByPk(updateUserDto.id);
            if (!user) {
                throw CustomError.notFound("Usuario no encontrado");
            }

            const cleanData = Object.fromEntries(
                Object.entries(updateUserDto).filter(([_, value]) => value !== undefined && value !== null && value !== '')
            );
        
            // Si no hay datos para actualizar, devolvemos el usuario sin modificar
            if (Object.keys(cleanData).length === 0) return UserEntity.fromObject(user);
        
            // Actualizamos solo los campos que llegaron
            await user.update(cleanData);
    
            return UserEntity.fromObject(user);
        }
        catch (error) {
            throw error;
        }
    }

    public async deleteUser(id: number) {
        try {

            await Usuario.destroy({ where: { id } });

        }
        catch (error) {
            throw error;
        }
    }
}