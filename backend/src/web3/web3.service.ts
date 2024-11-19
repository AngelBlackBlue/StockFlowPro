import { Inject, Injectable } from '@nestjs/common';
import { RegisterPurchaseDto } from 'src/stock/dto/RegisterPurchaseDto';
import Web3 from 'web3';
import { uuidV4 } from 'web3-utils';
import { TypeDetail, Product } from '../stock/types/types.product';


@Injectable()
export class Web3Service {
  constructor(
    @Inject('Web3')
    private readonly web3: Web3,
    @Inject('Config')
    private readonly config: {
      wallet: string;
      privateKey: string;
      contractAbi: any;
      contractAddress: string;
    },
  ) {}

  async balance() {
    const balance = await this.web3.eth.getBalance(this.config.wallet);
    return this.web3.utils.fromWei(balance, 'wei');
  }

  async createPurchase(registerPurchaseDto: RegisterPurchaseDto) {
    try {
      const contract = new this.web3.eth.Contract(
        this.config.contractAbi,
        this.config.contractAddress,
      );
      const uuid: string = uuidV4();

      const { sku, detailString, input, unitCost, balance, totalCost, ppp } =
        registerPurchaseDto;

      const detail = TypeDetail[detailString as keyof typeof TypeDetail];

      const nonce = await this.web3.eth.getTransactionCount(
        this.config.wallet,
        'latest',
      );




      const gasLimit = await contract.methods
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
      .estimateGas({ from: this.config.wallet });   // valor estimado de gas a utilizar


    console.log('Estimated Gas:', gasLimit); 
    const baseFee = await this.web3.eth.getGasPrice(); // costo base del gas
    console.log('baseFee:', baseFee);

    const maxPriorityFeePerGas = this.web3.utils.toWei('2', 'gwei'); 
    const maxFeePerGas = (BigInt(baseFee) + BigInt(maxPriorityFeePerGas)).toString();


    const maxPriorityFeePerGas2 = this.web3.utils.toWei('25', 'gwei'); // propina adicional
    const maxFeePerGas2 = (BigInt(baseFee) + BigInt(maxPriorityFeePerGas2)).toString(); //costo máximo de gas
    console.log('maxPriorityFeePerGas:', maxPriorityFeePerGas2); 
    console.log('maxFeePerGas:', maxFeePerGas2);


      const tx = {
        from: this.config.wallet,
        to: this.config.contractAddress,
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
        gas: gasLimit,
        maxPriorityFeePerGas,
        maxFeePerGas,
        nonce,
      };


      const signedTx = await this.web3.eth.accounts.signTransaction(
        tx,
        this.config.privateKey,
      );
      const result = await this.web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
      );

      return result.transactionHash;
    } catch (error) {
      console.error('Error interacting with contract:', error.message);
      throw error;
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      const contract = new this.web3.eth.Contract(
        this.config.contractAbi,
        this.config.contractAddress,
      );
      const tx = await contract.methods.getAllProducts().call();

      //Manejar posibles valores BigInt
      const sanitizedTx = JSON.parse(
        JSON.stringify(tx, (key, value) =>
          typeof value === 'bigint' ? value.toString() : value,
        ),
      );

      const cleanedTx = sanitizedTx.map((item: Product) => {
        const filtered = Object.fromEntries(
          Object.entries(item).filter(
            ([key]) => key !== '__length__' && isNaN(Number(key)),
          ),
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
