import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { ProductDto } from '../products';

export class AddProductOrderDto {

    @Expose()
    @IsNumber()
    @IsNotEmpty({ message: 'El id es obligatorio' })
    id!: number;

    @Expose()
    @ValidateNested()
    @Type(() => ProductDto)
    @IsNotEmpty({ message: 'El producto es obligatorio' })
    producto!: ProductDto;

}