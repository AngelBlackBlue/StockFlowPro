import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StockService } from './stock.service';
import { RegisterPurchaseDto } from './dto/RegisterPurchaseDto';


@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post('purchase')
  purchase(@Body() registerPurchaseDto: RegisterPurchaseDto) {
    return this.stockService.createPurchase(registerPurchaseDto);
  }

  @Get('products')
  findAll() {
    return this.stockService.findAll();
  }


}
