import { Injectable } from '@nestjs/common';
import { CreateKardexpppDto } from './dto/create-kardexppp.dto';
import { UpdateKardexpppDto } from './dto/update-kardexppp.dto';

import { InputKardexpppDto } from './dto/input-kardexppp.dto';
import { Web3Service } from '../web3/web3.service';

@Injectable()
export class KardexpppService {
  constructor(private readonly web3Service: Web3Service) {}

  async input(iputKardexpppDto: InputKardexpppDto) {
    const allRegisters = await this.web3Service.findAll();
    console.log(allRegisters);
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
