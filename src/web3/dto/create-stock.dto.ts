import { IsString, IsNumber, IsEnum } from 'class-validator';

enum TypeDetail {
  initial = 'initial',
  buy = 'buy',
  sell = 'sell',
}


export class CreateStockDto {
  
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
  output: number;

  @IsNumber()
  totalCost: number;
  
  @IsNumber()
  ppp: number
}
