//
// Created by Lucas V A Zampoli o 17/10/23.
// Copyright 2023 &copy; Zampo: All rights reserved.
//

/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Patch,
  UseGuards,
  UploadedFile,
  ParseFilePipe,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductSerializer } from './product.serializer';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';


@Controller('api/v1/products')
//@UseGuards(AuthGuard('jwt'))
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async create(@Body() createProductDto: CreateProductDto,
        @UploadedFile(
          new ParseFilePipe({
            errorHttpStatusCode: 422,
          }),
        )
        file: Express.Multer.File,
      ){
      
      const product = new ProductSerializer(await this.productsService.create({
        ...createProductDto,
        file,
      }));

      return product; 

  }
  
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll() {
    const products = await this.productsService.findAll();
    return products.map((product) => new ProductSerializer(product));
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = new ProductSerializer(await this.productsService.findOne(+id));
    return product;
  }
  
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto,
    @UploadedFile()
    file?: Express.Multer.File,
    ){
      const product = new ProductSerializer(await this.productsService.update(
        +id, 
      {
        ...updateProductDto, 
           file,
      }));
      return product; 
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }

  @Get('file/:file')
  file(@Param('file') file: string, @Res() res: Response) {
    const fileStream = createReadStream(join(process.cwd(), 'upload', file));
    fileStream.pipe(res);
  }
}
