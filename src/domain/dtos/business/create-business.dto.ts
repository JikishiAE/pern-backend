import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBusinessDto {

  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsNumber()
  @IsNotEmpty()
  propietario_id!: number;

}