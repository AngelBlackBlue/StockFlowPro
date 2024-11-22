import { Test, TestingModule } from '@nestjs/testing';
import { KardexpppService } from './kardexppp.service';

describe('KardexpppService', () => {
  let service: KardexpppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KardexpppService],
    }).compile();

    service = module.get<KardexpppService>(KardexpppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
