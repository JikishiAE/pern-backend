import { Expose } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class UserIdDto {
  @Expose()
  @IsNumber()
  @IsNotEmpty({ message: 'El id es obligatorio' })
  id!: number;
}