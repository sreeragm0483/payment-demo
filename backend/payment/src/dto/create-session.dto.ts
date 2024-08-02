import { IsString, IsNumber, IsEmail, IsNotEmpty } from "class-validator";

export class CreateSessionDto {
  @IsString()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
