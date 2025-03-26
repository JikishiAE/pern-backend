import { Expose } from 'class-transformer';
import { IsEmail, IsIn, IsNotEmpty, IsString, Matches } from 'class-validator';

export class RegisterUserDto {

  @Expose()
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}/, {
    message: 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
  contrasena!: string;

  @Expose()
  @IsNotEmpty()
  @IsEmail()
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: 'Invalid email format',
  })
  correo!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @IsIn(["Cliente", "Negocio"], {
    message: 'El valor debe ser "Cliente" o "Negocio"',
  })
  rol!: string;

}