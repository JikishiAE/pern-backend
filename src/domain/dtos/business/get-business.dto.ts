import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetBusinessDto {

    @IsOptional()
    @IsNumber()
    id!: number;

    @IsOptional()
    @IsString()
    nombre!: string;

}