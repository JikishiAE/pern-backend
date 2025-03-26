import { JwtAdapter, bcryptAdapter } from '../../config';
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity, ValidateUserDto } from '../../domain';
import { UsersRepository } from '../../infrastructure/repositories/users/users.repository';


export class AuthService {

  constructor(
    private readonly _usersRepository: UsersRepository
  ) {}

  public async registerUser( registerUserDto: RegisterUserDto ) {

    try {

      const existUser = await this._usersRepository.findByEmail(registerUserDto.correo);
  
      if ( existUser ) throw CustomError.badRequest('Email already exist');
        
      // Encriptar la contraseña
      registerUserDto.contrasena = bcryptAdapter.hash( registerUserDto.contrasena );

      const userEntity = await this._usersRepository.registerUser(registerUserDto);

      const token = await JwtAdapter.generateToken({ id: userEntity.id, role: userEntity.role });
      if ( !token ) throw CustomError.internalServer('Error while creating JWT');

      return { 
        user: userEntity, 
        token: token,
      };

    } catch (error) {
      throw error;
    }

  }


  public async loginUser( loginUserDto: LoginUserDto ) {

    try {
      
      const user = await this._usersRepository.findByEmail(loginUserDto.correo);
      
      if (!user) throw CustomError.badRequest('Email not exist');
  
      const isMatching = bcryptAdapter.compare( loginUserDto.contrasena, user.password );
      if ( !isMatching ) throw CustomError.badRequest('Password is not valid');
      
      const token = await JwtAdapter.generateToken({ id: user.id, role: user.role });
      if ( !token ) throw CustomError.internalServer('Error while creating JWT');
  
      return {
        user: user,
        token: token,
      }
      
    }
    catch (error) {
      throw error;
    }


  }

  public async validateUser( validateUserDto: ValidateUserDto ) {

    try {
      
      const user = await this._usersRepository.findByEmail(validateUserDto.correo);
      
      if (!user) throw CustomError.badRequest('Email not exist');

      await this._usersRepository.validateUser(validateUserDto.correo);
      
    }
    catch (error) {
      throw error;
    }


  }


}