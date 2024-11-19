import { IsString, IsNumber, IsEnum } from 'class-validator';

enum TypeDetail {
  initial = 'initial',
  buy = 'buy',
  sell = 'sell',
}

export class InputKardexpppDto {
  
  @IsString()
  sku: string;

  @IsEnum(TypeDetail)
  detailString: TypeDetail;

  @IsNumber()
  input: number;

  @IsNumber()
  unitCost: number;

}
