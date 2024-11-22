import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateKardexpppDto } from './dto/create-kardexppp.dto';
import { InputKardexpppDto } from './dto/input-kardexppp.dto';
import { OutputKardexpppDto } from './dto/output-kardexppp.dto';
import { Web3Service } from '../web3/web3.service';
import { catchError } from 'rxjs';

@Injectable()
export class KardexpppService {
  constructor(private readonly web3Service: Web3Service) {}

  async create(inputKardexpppDto: InputKardexpppDto ) {

    try {

      const { sku, detailString, input, unitCost } = inputKardexpppDto;

      const allRegisters = await this.web3Service.findAll();
      const skuKardex = allRegisters.filter((item) => item.sku === sku);

    
      if (skuKardex.length > 0) {
        throw new BadRequestException('SKU_ALREADY_EXISTS');
      }

      const newRegister = {
        sku,
        detailString,
        input,
        unitCost,
        output: 0,
        balance: input,
        totalCost: input * unitCost,
        ppp: unitCost,
      };

      console.log(newRegister);
  
      const result = await this.web3Service.create(newRegister);
      if (!result) {
        throw new BadRequestException('ERROR_CREATING_REGISTER');
      }
  
      return await this.lastRegister(sku);
      
    } catch (error) {
      throw new BadRequestException(error.message);
      
    }

  }

  async input(inputKardexpppDto: InputKardexpppDto) {

    try {
      const allRegisters = await this.web3Service.findAll();
      const { sku, detailString, input, unitCost } = inputKardexpppDto;
  
      if (!allRegisters.length) {
        throw new BadRequestException('NO_REGISTERS_FOUND');
      }
  
      const skuKardex = allRegisters.filter((item) => item.sku === sku);
  
      if (!skuKardex.length) {
        throw new BadRequestException('SKU_NOT_FOUND');
      }
  
      const lastRegister = skuKardex[skuKardex.length - 1];
  
      const newBalance = Number(lastRegister.balance) + input;
      const newTotalCost = Number(lastRegister.totalCost) + input * unitCost;
      const newPPP = Number((newTotalCost / newBalance).toFixed(2));
  
      const newRegister = {
        sku,
        detailString,
        input,
        unitCost,
        output: 0,
        balance: newBalance,
        totalCost: newTotalCost,
        ppp: newPPP,
      };
  
      const result = await this.web3Service.create(newRegister);
      if (!result) {
        throw new BadRequestException('ERROR_CREATING_REGISTER');
      }
  
      return await this.lastRegister(sku);
      
    } catch (error) {
      
      throw new BadRequestException(error.message);
      
    }

  }

  async output(outputKardexpppDto: OutputKardexpppDto) {
    const allRegisters = await this.web3Service.findAll();

    if (!allRegisters.length) {
      throw new BadRequestException('NO_REGISTERS_FOUND');
    }

    const { sku, detailString, output } = outputKardexpppDto;

    const skuKardex = allRegisters.filter((item) => item.sku === sku);

    if (!skuKardex.length) {
      throw new BadRequestException('SKU_NOT_FOUND');
    }

    const lastRegister = skuKardex[skuKardex.length - 1];

    if (Number(lastRegister.balance) < output) {
      throw new BadRequestException('INSUFFICIENT_BALANCE');
    }

    const newBalance = Number(lastRegister.balance) - output;
    const newTotalCost = Math.round(Number(newBalance) * Number(lastRegister.ppp));
    const newPPP = Number(lastRegister.ppp);

    const newRegister = {
      sku,
      detailString,
      input: 0,
      unitCost: 0,
      output,
      balance: newBalance,
      totalCost: newTotalCost,
      ppp: newPPP,
    };

    console.log(newRegister);

    const result = await this.web3Service.create(newRegister);

    if (!result) {
      throw new BadRequestException('ERROR_CREATING_REGISTER');
    }

    return await this.lastRegister(sku);
  }

  async searchSku(sku: string): Promise<any> {
    try {
      const allRegisters = await this.web3Service.findAll();

      if (!allRegisters.length) {
        throw new BadRequestException('NO_REGISTERS_FOUND');
      }
  
      const skuKardex = allRegisters.filter((item) => item.sku === sku);
  
      if (!skuKardex.length) {
        throw new BadRequestException('SKU_NOT_FOUND');
      }
      return skuKardex;
      
    } catch (error) {

      throw new BadRequestException('ERROR_SEARCHING_SKU');
      
    }

  }

  async lastRegister(sku: string): Promise<any> {
    const skuKardex = await this.searchSku(sku);
    const lastRegister = skuKardex[skuKardex.length - 1];
    return lastRegister;
  }
}
