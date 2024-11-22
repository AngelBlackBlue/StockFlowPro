import { Body, Controller, Get, Post } from '@nestjs/common';
import { Web3Service } from './web3.service';
import { CreateStockDto } from './dto/create-stock.dto';

@Controller('web3')
export class Web3Controller {
  constructor(private readonly web3Service: Web3Service) {}
  @Get('balance')
  getBalance() {
    return this.web3Service.balance();
  }

  @Post('purchase')
  purchase(@Body() createStockDto: CreateStockDto) {
    return this.web3Service.create(createStockDto);
  }
  @Get('products')
  findAll() {
    return this.web3Service.findAll();
  }
}
