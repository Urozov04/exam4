import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class ConfirmLoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  otp: number;
}
