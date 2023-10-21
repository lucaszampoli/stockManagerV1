import { Test, TestingModule } from '@nestjs/testing';
import { SalersService } from './salers.service';

describe('SalersService', () => {
  let service: SalersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalersService],
    }).compile();

    service = module.get<SalersService>(SalersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
