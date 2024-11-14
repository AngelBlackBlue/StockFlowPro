import { Injectable } from '@nestjs/common';
import { RegisterPurchaseDto } from './dto/RegisterPurchaseDto';
import Web3 from 'web3';
import { abi } from '../contracts/Stock';
import { address } from '../contracts/Stock-address.json';
import { v4 as uuidv4 } from 'uuid';

export enum TypeDetail {
  initial = 0,
  buy = 1,
  sell = 2,
}

const privateKey = '9b0292bd49dae2e7b2ad2ae9920b5c0868af609721880f819355552a721949f1';

@Injectable()
export class StockService {
  private web3: Web3;
  private contract: any;
  private accountAddress = '0xcEcD36e37Cc7BFD4381FcBAF9F1A07ca3D5D693D';

  constructor() {
    this.web3 = new Web3(
      new Web3.providers.HttpProvider(
        'https://polygon-amoy.infura.io/v3/dfb2caef840745438b111b7f058c491d',
      ),
    );
    this.contract = new this.web3.eth.Contract(abi, address);
  }

  async createPurchase(registerPurchaseDto: RegisterPurchaseDto) {
    try {
      const uuid: string = uuidv4();

      const { sku, detailString, input, unitCost, balance, totalCost, ppp } =
        registerPurchaseDto;

      const detail = TypeDetail[detailString as keyof typeof TypeDetail];

      const nonce = await this.web3.eth.getTransactionCount(
        this.accountAddress,
        'latest',
      );

      const tx = {
        from: this.accountAddress,
        to: address,
        data: this.contract.methods
          .mint(uuid, sku, detail, input, unitCost, balance, totalCost, ppp)
          .encodeABI(),
        nonce,
      };

      const signedTx = await this.web3.eth.accounts.signTransaction(tx, privateKey);
      const result = await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);

      return result;
    } catch (error) {
      console.error('Error interacting with contract:', error);
      throw error;
    }
  }

  async findAll() {
    try {
      const tx = await this.contract.methods.getAllProducts().call();
      return tx;
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      throw error;
    }
  }
}



// import { Injectable } from '@nestjs/common';
// import { RegisterPurchaseDto } from './dto/RegisterPurchaseDto';
// import Web3 from 'web3';
// import { abi } from '../contracts/Stock';
// import { address } from '../contracts/Stock-address.json';
// import { uuidV4 } from 'web3-utils';

// export enum TypeDetail {
//   initial = 0,
//   buy = 1,
//   sell = 2,
// }

// const privateKey =
//   '9b0292bd49dae2e7b2ad2ae9920b5c0868af609721880f819355552a721949f1';

// @Injectable()
// export class StockService {

//   // async createPurchase(registerPurchaseDto: RegisterPurchaseDto) {

//   //   try {
//   //     const web3 = new Web3(new Web3.providers.HttpProvider('https://polygon-amoy.infura.io/v3/dfb2caef840745438b111b7f058c491d'));
//   //     const contract = new web3.eth.Contract(abi, address);
//   //     const uuid: string = uuidV4();

//   //     const {
//   //       sku,
//   //       detailString,
//   //       input,
//   //       unitCost,
//   //       balance,
//   //       totalCost,
//   //       ppp,
//   //     } = registerPurchaseDto;

//   //     const detail = TypeDetail[detailString as keyof typeof TypeDetail];

//   //     const tx = await contract.methods
//   //       .registerBuy(uuid, sku, detail, input, unitCost, balance, totalCost, ppp )
//   //       .send({ from: '0xcEcD36e37Cc7BFD4381FcBAF9F1A07ca3D5D693D' });

//   //     return tx;
//   //   } catch (error) {
//   //     console.error('Error interacting with contract:')
//   //     throw error;
//   //   }

//   // }

//   async findAll() {
//     try {
//       const web3 = new Web3(
//         new Web3.providers.HttpProvider(
//           'https://polygon-amoy.infura.io/v3/dfb2caef840745438b111b7f058c491d',
//         ),
//       );
//       const contract = new web3.eth.Contract(abi, address);
//       const tx = await contract.methods.getAllProducts().call();
//       return tx;
//     } catch (error) {
//       console.error('Error al obtener los productos:', error);
//       throw error;
//     }
//   }
// }
