import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CreateBusinessDto } from './create-business.dto';
import { Expose } from 'class-transformer';

// Hace todas las propiedades opcionales excepto el id
export class UpdateBusinessDto extends CreateBusinessDto {
  @Expose()
  @IsNumber()
  @IsNotEmpty({ message: 'El id es obligatorio' })
  id!: number;

  // Vuelve todas las demás propiedades opcionales
  @IsOptional()
  override nombre!: string;

  @IsOptional()
  override propietario_id!: number;

}