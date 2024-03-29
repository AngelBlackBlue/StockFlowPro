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

  // @IsString()
  // @IsOptional()
  // lastname?: string;

  // @IsPhoneNumber()
  // @IsOptional()
  // phone?: string;

  // @IsString()
  // @IsOptional()
  // company?: string;

  // @IsString()
  // @IsOptional()
  // image?: string;

  // @IsString()
  // @IsOptional()
  // cbu?: string;

  // @IsString()
  // @IsOptional()
  // alias?: string;

  // @IsString()
  // @IsOptional()
  // cuit?: string;

  // @IsNumber()
  // @IsOptional()
  // validator?: number;

  // @IsString()
  // @IsOptional()
  // status?: string;
}
