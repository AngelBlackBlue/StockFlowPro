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

    @IsNumber()
    buyPrice: number;

    @IsNumber()
    @IsOptional()
    salePrice?: number;
}
