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

      let { sku, detailString, input, unitCost, output ,balance, totalCost, ppp } =
        registerPurchaseDto;

      const detail = TypeDetail[detailString as keyof typeof TypeDetail];

      const nonce = await this.web3.eth.getTransactionCount(
        this.config.wallet,
        'latest',
      );
      
      input = input *100;
      unitCost = unitCost *100;
      output = output *100;
      balance = balance *100;
      totalCost = totalCost *100;
      ppp = ppp *100;

      const gasLimit = await contract.methods
      .register(
        uuid,
        sku,
        detail,
        input,
        unitCost,
        output,
        balance,
        totalCost,
        ppp,
      )
      .estimateGas({ from: this.config.wallet });   // valor estimado de gas a utilizar


    console.log('Estimated Gas:', gasLimit); 
    const baseFee = await this.web3.eth.getGasPrice(); // costo base del gas
    console.log('baseFee:', baseFee);

    const maxPriorityFeePerGas = this.web3.utils.toWei('25', 'gwei'); 
    const maxFeePerGas = (BigInt(baseFee) + BigInt(maxPriorityFeePerGas)).toString();


    // const maxPriorityFeePerGas2 = this.web3.utils.toWei('25', 'gwei'); // propina adicional
    // const maxFeePerGas2 = (BigInt(baseFee) + BigInt(maxPriorityFeePerGas2)).toString(); //costo máximo de gas
    // console.log('maxPriorityFeePerGas:', maxPriorityFeePerGas2); 
    // console.log('maxFeePerGas:', maxFeePerGas2);


      const tx = {
        from: this.config.wallet,
        to: this.config.contractAddress,
        data: contract.methods
          .register(
            uuid,
            sku,
            detail,
            input,
            unitCost,
            output,
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

      console.log(tx)

      // //Manejar posibles valores BigInt
      const sanitizedTx = JSON.parse(
        JSON.stringify(tx, (key, value) =>
          typeof value === 'bigint' ? Number(value) : value,
        ),
      );

      console.log(sanitizedTx)

      const cleanedTx = sanitizedTx.map((item: Product) => {
        const filtered = Object.fromEntries(
          Object.entries(item).filter(
            ([key]) => key !== '__length__' && isNaN(Number(key)),
          ),
        );
        return {
          ...filtered,
          timestamp: new Date(Number(filtered.timestamp) * 1000).toISOString(),
          detail: TypeDetail[filtered.detail as keyof typeof TypeDetail],
          input: Number(filtered.input)/100,
          unitCost: Number(filtered.unitCost)/100,
          output: Number(filtered.output)/100,
          balance: Number(filtered.balance)/100,
          totalCost: Number(filtered.totalCost)/100,
          ppp: Number(filtered.ppp)/100,
        };
      });

      return cleanedTx;
      
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      throw error;
    }
  }
}
