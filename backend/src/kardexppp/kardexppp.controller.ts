import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { KardexpppService } from './kardexppp.service';
import { CreateKardexpppDto } from './dto/create-kardexppp.dto';
import { InputKardexpppDto } from './dto/input-kardexppp.dto';

@Controller('kardexppp')
export class KardexpppController {
  constructor(private readonly kardexpppService: KardexpppService) {}

  @Post('input')
  input(@Body() inputKardexpppDto: InputKardexpppDto) {
    return this.kardexpppService.input(inputKardexpppDto);
  }

  @Post()
  create(@Body() createKardexpppDto: CreateKardexpppDto) {
    return this.kardexpppService.create(createKardexpppDto);
  }

  @Get()
  findAll() {
    return this.kardexpppService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kardexpppService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kardexpppService.remove(+id);
  }
}
