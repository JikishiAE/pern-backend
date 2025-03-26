import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetProductsDto {

    @IsOptional()
    @IsNumber()
    id!: number;

    @IsOptional()
    @IsString()
    nombre!: string;

}