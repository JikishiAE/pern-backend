import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBusinessDto {

  @Expose()
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  propietario_id!: number;

}