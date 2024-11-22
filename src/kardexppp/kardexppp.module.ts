import { Module } from '@nestjs/common';
import { KardexpppService } from './kardexppp.service';
import { KardexpppController } from './kardexppp.controller';
import { Web3Module } from 'src/web3/web3.module';



@Module({
  imports: [Web3Module],
  controllers: [KardexpppController],
  providers: [KardexpppService],
})
export class KardexpppModule {}
