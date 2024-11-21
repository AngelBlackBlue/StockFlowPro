import { Body, Controller, Get, Post } from '@nestjs/common';
import { Web3Service } from './web3.service';
import { CreateKardexpppDto } from 'src/kardexppp/dto/create-kardexppp.dto';

@Controller('web3')
export class Web3Controller {
  constructor(private readonly web3Service: Web3Service) {}
  @Get('balance')
  getBalance() {
    return this.web3Service.balance();
  }

  @Post('purchase')
  purchase(@Body() createKardexpppDto: CreateKardexpppDto) {
    return this.web3Service.create(createKardexpppDto);
  }
  @Get('products')
  findAll() {
    return this.web3Service.findAll();
  }
}
