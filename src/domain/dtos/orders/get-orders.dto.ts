import { Expose } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class GetOrdersDto {

    @Expose()
    @IsNumber()
    negocio_id!: number;

    @Expose()
    @IsOptional()
    @IsNumber()
    id!: number;

    @Expose()
    @IsOptional()
    @IsNumber()
    estatus_id!: number;

    @Expose()
    @IsOptional()
    @IsNumber()
    total!: number;

}