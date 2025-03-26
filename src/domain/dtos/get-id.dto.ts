import { IsNotEmpty, IsNumber } from "class-validator";

export class GetIdDto {
  @IsNumber()
  @IsNotEmpty({ message: 'El id es obligatorio' })
  id!: number;
}