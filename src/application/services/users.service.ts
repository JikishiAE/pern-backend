import { bcryptAdapter } from '../../config';
import { CustomError, GetUsersDto, UpdateUserDto, UserIdDto } from '../../domain';
import { UsersRepository } from '../../infrastructure/repositories/users/users.repository';


export class UsersService {

    constructor(
        private readonly _usersRepository: UsersRepository
    ) {}

    public async getUsers( getUsersDto: GetUsersDto ) {

        try {

            const foundUsers = await this._usersRepository.findUsers({
                ...getUsersDto
            });
        
            if ( !foundUsers ) throw CustomError.notFound('No se encontraron registros');

            return { 
                users: foundUsers,
            };

        } catch (error) {
            throw error;
        }

    }

    public async updateUser( updateUserDto: UpdateUserDto ) {

        try {

            const user = await this._usersRepository.findById(updateUserDto.id);
      
            if (!user) throw CustomError.badRequest('User don\'t exists');

            if (updateUserDto?.contrasena) updateUserDto.contrasena = bcryptAdapter.hash( updateUserDto.contrasena );

            const updatedUser = await this._usersRepository.updateUser({
                ...updateUserDto
            });

            return { 
                user: updatedUser,
            };

        } catch (error) {
            throw error;
        }

    }

    public async deleteUser( deleteUserDto: UserIdDto ) {

        try {

            const user = await this._usersRepository.findById(deleteUserDto.id);
      
            if (!user) throw CustomError.badRequest('User don\'t exists');

            await this._usersRepository.deleteUser(deleteUserDto.id);

        } catch (error) {
            throw error;
        }

    }


}