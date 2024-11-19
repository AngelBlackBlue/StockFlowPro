import { PartialType } from '@nestjs/swagger';
import { CreateKardexpppDto } from './create-kardexppp.dto';

export class UpdateKardexpppDto extends PartialType(CreateKardexpppDto) {}
