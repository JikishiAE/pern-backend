import { IsNotEmpty, IsNumber } from 'class-validator';
import { IProduct } from '../../interfaces';
import { Expose } from 'class-transformer';

export class AddProductOrderDto {

    @Expose()
    @IsNumber()
    @IsNotEmpty({ message: 'El id es obligatorio' })
    id!: number;

    @Expose()
    @IsNotEmpty()
    producto!: IProduct;

    user_id!: number;

}