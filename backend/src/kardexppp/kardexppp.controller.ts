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
import { OutputKardexpppDto } from './dto/output-kardexppp.dto';

@Controller('kardexppp')
export class KardexpppController {
  constructor(private readonly kardexpppService: KardexpppService) {}

  @Post('input')
  input(@Body() inputKardexpppDto: InputKardexpppDto) {
    return this.kardexpppService.input(inputKardexpppDto);
  }

  @Post('output')
  output(@Body() outputKardexpppDto: OutputKardexpppDto) {
    return this.kardexpppService.output(outputKardexpppDto);
  }


}
