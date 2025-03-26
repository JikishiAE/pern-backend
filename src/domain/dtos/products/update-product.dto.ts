import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CreateProductDto } from './create-product.dto';
import { Expose } from 'class-transformer';

export class UpdateProductDto extends CreateProductDto {
  @Expose()
  @IsNumber()
  @IsNotEmpty({ message: 'El id es obligatorio' })
  id!: number;

  @IsOptional()
  override nombre!: string;

  @IsOptional()
  override negocio_id!: number;

  @IsOptional()
  override cantidad!: number;

  @IsOptional()
  override precio!: number;

}