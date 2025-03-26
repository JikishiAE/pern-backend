import { IsNotEmpty, IsNumber } from "class-validator";

export class BusinessIdDto {
  @IsNumber()
  @IsNotEmpty({ message: 'El id es obligatorio' })
  id!: number;
}