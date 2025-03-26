import { Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetBusinessDto {

    @Expose()
    @IsOptional()
    @IsNumber()
    id!: number;

    @Expose()
    @IsOptional()
    @IsString()
    nombre!: string;

}