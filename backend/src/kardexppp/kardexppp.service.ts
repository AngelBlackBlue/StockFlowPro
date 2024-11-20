import { Injectable } from '@nestjs/common';
import { CreateKardexpppDto } from './dto/create-kardexppp.dto';
import { UpdateKardexpppDto } from './dto/update-kardexppp.dto';

import { InputKardexpppDto } from './dto/input-kardexppp.dto';
import { Web3Service } from '../web3/web3.service';

@Injectable()
export class KardexpppService {
  constructor(private readonly web3Service: Web3Service) {}

  async input(inputKardexpppDto: InputKardexpppDto) {
    const allRegisters = await this.web3Service.findAll();
    console.log(allRegisters);
    const { sku, detailString, input, unitCost} =  inputKardexpppDto
    console.log(inputKardexpppDto);

    const skuKardex = allRegisters.filter((item) => item.sku === sku);
    console.log(skuKardex);
    // if (!skuKardex) {
      
    // }

    const lastRegister = skuKardex[skuKardex.length - 1];
    console.log(lastRegister);

    // const newBalance: number = lastRegister.balance + input;
    // const newTotalCost: number = lastRegister.totalCost + (input * unitCost);

    // const newPPP = (newTotalCost / newBalance).toFixed(2);
    
    // const newRegister = {
    //   sku,
    //   detail: detailString,
    //   input,
    //   unitCost,
    //   output: 0,
    //   balance: newBalance,
    //   totalCost: newTotalCost,
    //   ppp: newPPP,   
    // }

    return `This action adds a new kardexppp`;
  }

  create(createKardexpppDto: CreateKardexpppDto) {
    return 'This action adds a new kardexppp';
  }

  findAll() {
    return `This action returns all kardexppp`;
  }

  findOne(id: number) {
    return `This action returns a #${id} kardexppp`;
  }

  update(id: number, updateKardexpppDto: UpdateKardexpppDto) {
    return `This action updates a #${id} kardexppp`;
  }

  remove(id: number) {
    return `This action removes a #${id} kardexppp`;
  }
}
