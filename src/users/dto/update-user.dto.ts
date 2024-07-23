import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Transform } from 'class-transformer';
import { IsString, MinLength, IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    // @IsOptional()
    // @Transform(({ value }) => value.trim())
    // @IsString()
    // @MinLength(4)
    // lastname: string;

    // @IsOptional()
    // @IsString()
    // phone: string;

    // @IsOptional()
    // @IsString()
    // company: string;

    // @IsOptional()
    // @IsString()
    // image: string;

    // @IsOptional()
    // @IsString()
    // cbu: string;

    // @IsOptional()
    // @IsString()
    // alias: string;

    // @IsOptional()
    // @IsString()
    // cuit: string;

}
