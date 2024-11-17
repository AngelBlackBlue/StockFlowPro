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

type Product = {
  tokenId: string;
  uuid: string;
  sku: string;
  timestamp: string;
  detail: string;
  input: string;
  unitCost: string;
  output: string;
  balance: string;
  totalCost: string;
  ppp: string;
};

const privateKey =
  '9b0292bd49dae2e7b2ad2ae9920b5c0868af609721880f819355552a721949f1';

@Injectable()
export class StockService {
  async createPurchase(registerPurchaseDto: RegisterPurchaseDto) {
    try {
      const web3 = new Web3(
        new Web3.providers.HttpProvider(
          'https://polygon-amoy.infura.io/v3/dfb2caef840745438b111b7f058c491d',
        ),
      );
      const contract = new web3.eth.Contract(abi, address);
      const uuid: string = uuidv4();

      const { sku, detailString, input, unitCost, balance, totalCost, ppp } =
        registerPurchaseDto;

      const detail = TypeDetail[detailString as keyof typeof TypeDetail];

      const nonce = await web3.eth.getTransactionCount(address, 'latest');

      const tx = {
        from: '0xcEcD36e37Cc7BFD4381FcBAF9F1A07ca3D5D693D',
        to: address,
        data: contract.methods
          .registerBuy(
            uuid,
            sku,
            detail,
            input,
            unitCost,
            balance,
            totalCost,
            ppp,
          )
          .encodeABI(),
        gas: 2100000,
        maxPriorityFeePerGas: web3.utils.toWei('10', 'gwei'),
        maxFeePerGas: web3.utils.toWei('20', 'gwei'),
        nonce,
      };

      const senderBalance = await web3.eth.getBalance(tx.from);
      const gasPrice = web3.utils.toBN(tx.maxFeePerGas).add(web3.utils.toBN(tx.gas));
      if (web3.utils.toBN(senderBalance).lt(gasPrice)) {
        throw new Error('Saldo insuficiente para cubrir el gas');
      }

      const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
      const result = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
      );

      return result.transactionHash;
    } catch (error) {
      console.error('Error interacting with contract:', error);
      throw error;
    }
  }

  

  async findAll(): Promise<Product[]> {
    try {
      const web3 = new Web3(
        new Web3.providers.HttpProvider(
          'https://polygon-amoy.infura.io/v3/dfb2caef840745438b111b7f058c491d',
        ),
      );
      const contract = new web3.eth.Contract(abi, address);
      const tx = await contract.methods.getAllProducts().call();
  
      // Manejar posibles valores BigInt
      const sanitizedTx = JSON.parse(
        JSON.stringify(tx, (key, value) =>
          typeof value === 'bigint' ? value.toString() : value,
        ),
      );

      const cleanedTx = sanitizedTx.map((item: Product) => {
        const filtered = Object.fromEntries(
          Object.entries(item).filter(([key]) => key !== '__length__' && isNaN(Number(key)))
        );
        return {
          ...filtered,
          timestamp: new Date(Number(filtered.timestamp) * 1000).toISOString(),
        };
      });

      return cleanedTx;
      
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

// type Product = {
//   tokenId: string;
//   uuid: string;
//   sku: string;
//   timestamp: string;
//   detail: string;
//   input: string;
//   unitCost: string;
//   output: string;
//   balance: string;
//   totalCost: string;
//   ppp: string;
// };

// const privateKey =
//   '9b0292bd49dae2e7b2ad2ae9920b5c0868af609721880f819355552a721949f1';

// @Injectable()
// export class StockService {

//   async createPurchase(registerPurchaseDto: RegisterPurchaseDto) {

//     try {
//       const web3 = new Web3(new Web3.providers.HttpProvider('https://polygon-amoy.infura.io/v3/dfb2caef840745438b111b7f058c491d'));
//       const contract = new web3.eth.Contract(abi, address);
//       const uuid: string = uuidV4();

//       const {
//         sku,
//         detailString,
//         input,
//         unitCost,
//         balance,
//         totalCost,
//         ppp,
//       } = registerPurchaseDto;

//       const detail = TypeDetail[detailString as keyof typeof TypeDetail];

//       const tx = await contract.methods
//         .registerBuy(uuid, sku, detail, input, unitCost, balance, totalCost, ppp )
//         .send({ from: '0xcEcD36e37Cc7BFD4381FcBAF9F1A07ca3D5D693D' });

//       return tx;
//     } catch (error) {
//       console.error('Error interacting with contract:')
//       throw error;
//     }

//   }

//   // async findAll() {
//   //   try {
//   //     const web3 = new Web3(
//   //       new Web3.providers.HttpProvider(
//   //         'https://polygon-amoy.infura.io/v3/dfb2caef840745438b111b7f058c491d',
//   //       ),
//   //     );
//   //     const contract = new web3.eth.Contract(abi, address);
//   //     const tx = await contract.methods.getAllProducts().call();
//   //     return tx;
//   //   } catch (error) {
//   //     console.error('Error al obtener los productos:', error);
//   //     throw error;
//   //   }
//   // }

//   async findAll(): Promise<Product[]> {
//     try {
//       const web3 = new Web3(
//         new Web3.providers.HttpProvider(
//           'https://polygon-amoy.infura.io/v3/dfb2caef840745438b111b7f058c491d',
//         ),
//       );
//       const contract = new web3.eth.Contract(abi, address);
//       const tx = await contract.methods.getAllProducts().call();
  
//       // Manejar posibles valores BigInt
//       const sanitizedTx = JSON.parse(
//         JSON.stringify(tx, (key, value) =>
//           typeof value === 'bigint' ? value.toString() : value,
//         ),
//       );

//       const cleanedTx = sanitizedTx.map((item: Product) => {
//         const filtered = Object.fromEntries(
//           Object.entries(item).filter(([key]) => isNaN(Number(key)))
//         );
//         return {
//           ...filtered,
//           timestamp: new Date(Number(filtered.timestamp) * 1000).toISOString(),
//         };
//       });

//       return cleanedTx;
      
//     } catch (error) {
//       console.error('Error al obtener los productos:', error);
//       throw error;
//     }
//   }
  
// }
