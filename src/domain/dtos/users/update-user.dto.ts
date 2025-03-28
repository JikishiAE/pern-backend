import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { RegisterUserDto } from '../auth';
import { Expose } from 'class-transformer';

// Hace todas las propiedades opcionales excepto el id
export class UpdateUserDto extends RegisterUserDto {
  @Expose()
  @IsNumber()
  @IsNotEmpty({ message: 'El id es obligatorio' })
  id!: number;

  // Vuelve todas las demás propiedades opcionales
  @IsOptional()
  override nombre!: string;

  @IsOptional()
  override contrasena!: string;

  @IsOptional()
  override correo!: string;

  @IsOptional()
  override rol!: string;
}