import { IsString, IsNotEmpty, Matches, IsEmail } from 'class-validator';

export class LoginUserDto {

  @IsString()
  @IsNotEmpty()
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}/, {
    message: 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
  contrasena!: string;

  @IsNotEmpty()
  @IsEmail()
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: 'Invalid email format',
  })
  correo!: string;

}