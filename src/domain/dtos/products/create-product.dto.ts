import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {

  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsNumber()
  @IsNotEmpty()
  negocio_id!: number;

  @IsNumber()
  @IsNotEmpty()
  cantidad!: number;

  @IsNumber()
  @IsNotEmpty()
  precio!: number;

  user_id!: number;

}