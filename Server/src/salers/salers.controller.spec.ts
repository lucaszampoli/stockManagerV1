import { Test, TestingModule } from '@nestjs/testing';
import { SalersController } from './salers.controller';
import { SalersService } from './salers.service';

describe('SalersController', () => {
  let controller: SalersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalersController],
      providers: [SalersService],
    }).compile();

    controller = module.get<SalersController>(SalersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
