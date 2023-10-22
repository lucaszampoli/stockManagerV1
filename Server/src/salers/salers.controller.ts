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
    //const orders = await this.salersService.findAll();
    //return orders.map((order) => new SalerSerializer(order));
    //const aux = await this.salersService.findAll();
    return await this.salersService.findAll();
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
