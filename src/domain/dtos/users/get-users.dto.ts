import { IsEmail, IsNumber, IsOptional, IsString, Matches } from 'class-validator';

export class GetUsersDto {

    @IsOptional()
    @IsNumber()
    id!: number;

    @IsOptional()
    @IsString()
    nombre!: string;

    @IsOptional()
    @IsEmail()
    @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
        message: 'Invalid email format',
    })
    correo!: string;

}