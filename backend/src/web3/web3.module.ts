import { Module } from '@nestjs/common';
import Web3 from 'web3';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { abi } from '../contracts/Stock'
import { Web3Service } from './web3.service';
import { Web3Controller } from './web3.controller';


@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'Web3',
      useFactory: (configService: ConfigService) => {
        return new Web3(configService.get<string>('INFURA_URL'));
      },
      inject: [ConfigService],
    },
    {
      provide: 'Config',
      useFactory: (configService: ConfigService) => {
        return {
          wallet: configService.get<string>('WALLET'),
          privateKey: configService.get<string>('PRIVATE_KEY'),
          contractAbi: abi,
          contractAddress: configService.get<string>('CONTRACT_ADDRESS'),
        };
      },
      inject: [ConfigService],
    },
    Web3Service,
  ],
  exports: [Web3Service],
  controllers: [Web3Controller],
})
export class Web3Module {}
