import { Expose } from 'class-transformer';
import { IsEmail, IsNumber, IsOptional, IsString, Matches } from 'class-validator';

export class GetUsersDto {

    @Expose()
    @IsOptional()
    @IsNumber()
    id!: number;

    @Expose()
    @IsOptional()
    @IsString()
    nombre!: string;

    @Expose()
    @IsOptional()
    @IsEmail()
    @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
        message: 'Invalid email format',
    })
    correo!: string;

}