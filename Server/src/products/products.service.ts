import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  async create(
    createProductDto: CreateProductDto & { file: Express.Multer.File },
  ) {
    const data: Prisma.ProductCreateInput = {
      name: createProductDto.name,
      sku: createProductDto.sku,
      category: createProductDto.category,
      quantity: Number(createProductDto.quantity),
      price: createProductDto.price,
      description: createProductDto.description,
      image_path: await createProductDto.file.path,
    };
    return this.prismaService.product.create({
      data,
    });
  }

  findAll() {
    return this.prismaService.product.findMany();
  }

  async findOne(id: number) {
    return this.prismaService.product.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto & { file?: Express.Multer.File },
  ) {
    if (!updateProductDto.file) {
      const data: Prisma.ProductUpdateInput = {
        name: updateProductDto.name,
        sku: updateProductDto.sku,
        category: updateProductDto.category,
        quantity: Number(updateProductDto.quantity),
        price: updateProductDto.price,
        description: updateProductDto.description,
      };
      return this.prismaService.product.update({
        where: { id },
        data: data,
      });
    } else {
      const data: Prisma.ProductUpdateInput = {
        name: updateProductDto.name,
        sku: updateProductDto.sku,
        category: updateProductDto.category,
        quantity: Number(updateProductDto.quantity),
        price: updateProductDto.price,
        description: updateProductDto.description,
        image_path: await updateProductDto.file.path,
      };
      return this.prismaService.product.update({
        where: { id },
        data: data,
      });
    }
  }

  remove(id: number) {
    return this.prismaService.product.delete({
      where: { id },
    });
  }
}
