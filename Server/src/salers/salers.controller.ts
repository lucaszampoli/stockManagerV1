import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SalersService } from './salers.service';
import { CreateSalerDto } from './dto/create-saler.dto';
import { UpdateSalerDto } from './dto/update-saler.dto';

@Controller('api/v1/saler')
export class SalersController {
  constructor(private readonly salersService: SalersService) {}

  @Post()
  create(@Body() createSalerDto: CreateSalerDto) {
    return this.salersService.create(createSalerDto);
  }

  @Get()
  findAll() {
    return this.salersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSalerDto: UpdateSalerDto) {
    return this.salersService.update(+id, updateSalerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salersService.remove(+id);
  }
}
