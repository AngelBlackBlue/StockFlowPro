import { Injectable } from '@nestjs/common';
import { CreateKardexpppDto } from './dto/create-kardexppp.dto';
import { UpdateKardexpppDto } from './dto/update-kardexppp.dto';

@Injectable()
export class KardexpppService {
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
