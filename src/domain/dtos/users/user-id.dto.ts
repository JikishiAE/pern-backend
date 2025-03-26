import { IsNotEmpty, IsNumber } from "class-validator";

export class UserIdDto {
  @IsNumber()
  @IsNotEmpty({ message: 'El id es obligatorio' })
  id!: number;
}