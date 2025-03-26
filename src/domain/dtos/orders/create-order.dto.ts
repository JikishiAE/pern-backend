import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { IProduct } from '../../interfaces';
import { Expose } from 'class-transformer';

export class CreateOrderDto {

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  negocio_id!: number;

  @Expose()
  @IsArray()
  productos!: IProduct[];

}