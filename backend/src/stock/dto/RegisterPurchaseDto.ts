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
  detail: TypeDetail;

  @IsNumber()
  input: number;

  @IsNumber()
  uniCost: number;
}
