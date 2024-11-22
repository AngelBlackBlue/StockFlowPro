import { Test, TestingModule } from '@nestjs/testing';
import { KardexpppController } from './kardexppp.controller';
import { KardexpppService } from './kardexppp.service';

describe('KardexpppController', () => {
  let controller: KardexpppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KardexpppController],
      providers: [KardexpppService],
    }).compile();

    controller = module.get<KardexpppController>(KardexpppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
