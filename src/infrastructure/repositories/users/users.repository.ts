import { RegisterUserDto, UserEntity } from "../../../domain";
import Usuario from "../../../models/usuario.model";

export class UsersRepository {

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
}