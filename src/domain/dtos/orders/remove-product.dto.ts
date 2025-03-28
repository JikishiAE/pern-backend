import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class RemoveProductOrderDto {

    @Expose()
    @IsNumber()
    @IsNotEmpty({ message: 'El id es obligatorio' })
    id!: number;

    @Expose()
    @IsNumber()
    @IsNotEmpty()
    producto_id!: number;

}