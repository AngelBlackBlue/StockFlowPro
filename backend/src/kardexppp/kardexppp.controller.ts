import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KardexpppService } from './kardexppp.service';
import { CreateKardexpppDto } from './dto/create-kardexppp.dto';
import { UpdateKardexpppDto } from './dto/update-kardexppp.dto';

@Controller('kardexppp')
export class KardexpppController {
  constructor(private readonly kardexpppService: KardexpppService) {}

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKardexpppDto: UpdateKardexpppDto) {
    return this.kardexpppService.update(+id, updateKardexpppDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kardexpppService.remove(+id);
  }
}
