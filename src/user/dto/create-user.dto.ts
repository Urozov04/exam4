import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { UserRoles } from 'src/constants';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword()
  @IsString()
  password: string;

  @IsString()
  @IsPhoneNumber('UZ')
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}
