import { IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateStockDto {
  @IsString()
  sku: string;

  @IsString()
  product: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  amount: number;

  @IsString()
  @IsOptional()
  image?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  buyPrice: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  salePrice?: number;
}
