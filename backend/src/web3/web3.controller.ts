import { Body, Controller, Get, Post } from '@nestjs/common';
import { Web3Service } from './web3.service';
import { RegisterPurchaseDto } from 'src/stock/dto/RegisterPurchaseDto';

@Controller('web3')
export class Web3Controller {
  constructor(private readonly web3Service: Web3Service) {}
  @Get('balance')
  getBalance() {
    return this.web3Service.balance();
  }

  @Post('purchase')
  purchase(@Body() registerPurchaseDto: RegisterPurchaseDto) {
    return this.web3Service.createPurchase(registerPurchaseDto);
  }
  @Get('products')
  findAll() {
    return this.web3Service.findAll();
  }
}
