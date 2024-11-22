import { IsString, IsNumber, IsEnum } from 'class-validator';

enum TypeDetail {
  initial = 'initial',
  buy = 'buy',
  sell = 'sell',
}

export class OutputKardexpppDto {
  
  @IsString()
  sku: string;

  @IsEnum(TypeDetail)
  detailString: TypeDetail;

  @IsNumber()
  output: number;

}
