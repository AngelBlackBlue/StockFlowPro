import { IsString, IsNumber, IsEnum } from 'class-validator';

export enum TypeDetail {
  initial = 'initial',
  buy = 'buy',
  sell = 'sell',
}

export class RegisterPurchaseDto {
  
  @IsString()
  sku: string;

  @IsEnum(TypeDetail)
  detailString: TypeDetail;

  @IsNumber()
  input: number;

  @IsNumber()
  unitCost: number;

  @IsNumber()
  balance: number;

  @IsNumber()
  totalCost: number;
  
  @IsNumber()
  ppp: number
}