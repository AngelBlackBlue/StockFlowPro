import {
  IsEmail,
  // IsNumber,
  // IsOptional,
  // IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstname: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
