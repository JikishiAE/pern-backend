import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {

  @Expose()
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  negocio_id!: number;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  cantidad!: number;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  precio!: number;

  user_id!: number;

}