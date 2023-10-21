import { Module } from '@nestjs/common';
import { SalersService } from './salers.service';
import { SalersController } from './salers.controller';

@Module({
  controllers: [SalersController],
  providers: [SalersService],
})
export class SalersModule {}
