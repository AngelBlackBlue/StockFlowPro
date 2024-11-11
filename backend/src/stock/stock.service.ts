import { Injectable } from '@nestjs/common';
import { RegisterPurchaseDto } from './dto/RegisterPurchaseDto';
import Web3 from 'web3';
import { abi } from '../contracts/Stock.json';
import { address } from '../contracts/Stock-address.json';
import { uuidV4 } from 'web3-utils';

@Injectable()
export class StockService {
  async createPurchase(registerPurchaseDto: RegisterPurchaseDto) {


    try {
      const web3 = new Web3(new Web3.providers.HttpProvider('infura'));
      const contract = new web3.eth.Contract(abi, address);
      const uuid: string = uuidV4();

      const tx = await contract.methods
        .registerBuy({ uuid, ...registerPurchaseDto })
        .send({ from: 'metamask' });

      return tx;
    } catch (error) {
      console.error('Error interacting with contract:')
      throw error;
    }


  }

  async findAll() {
    try {
      const web3 = new Web3(new Web3.providers.HttpProvider('infura'));
      const contract = new web3.eth.Contract(abi, address);
      const tx = await contract.methods.getAllProducts().call();
      return tx;
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      throw error;
    }
  }
}
