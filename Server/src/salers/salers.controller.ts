import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SalersService } from './salers.service';
import { CreateSalerDto } from './dto/create-saler.dto';
import { UpdateSalerDto } from './dto/update-saler.dto';
import { SalerSerializer } from './salers.serializer';

@Controller('api/v1/salers')
export class SalersController {
  constructor(private readonly salersService: SalersService) {}

  @Post()
  create(@Body() createSalerDto: CreateSalerDto) {
    return this.salersService.create(createSalerDto);
  }

  @Get()
  async findAll() {
    return await this.salersService.findAll();
  }

  @Get('getOrderProductsSaler/:id')
  getOrderProductsSaler(@Param('id') id: string) {
    return this.salersService.findOneOrderProduct(+id);
  }

  @Get('getSaler/:id')
  getSaler(@Param('id') id: string) {
    return this.salersService.findOneOrder(+id);
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
