import { Expose } from 'class-transformer';
import { IsNotEmpty, Matches, IsEmail } from 'class-validator';

export class ValidateUserDto {

  @Expose()
  @IsNotEmpty()
  @IsEmail()
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: 'Invalid email format',
  })
  correo!: string;

}