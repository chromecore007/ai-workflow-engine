import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateRequestDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  message: string;
}