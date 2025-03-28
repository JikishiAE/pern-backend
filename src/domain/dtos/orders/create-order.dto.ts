import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { ProductDto } from '../products';

export class CreateOrderDto {

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  negocio_id!: number;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  productos!: ProductDto[];

}