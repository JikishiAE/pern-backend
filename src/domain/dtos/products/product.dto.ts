import { Expose } from "class-transformer";
import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class ProductDto {
    @Expose()
    @IsNumber()
    @IsNotEmpty({ message: 'El ID del producto es obligatorio' })
    id!: number;

    @Expose()
    @IsNumber()
    @Min(1, { message: 'La cantidad debe ser mayor a 0' })
    cantidad!: number;
}