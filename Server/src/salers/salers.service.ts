//
// Created by Lucas V A Zampoli o 21/10/23.
// Copyright 2023 &copy; Zampo: All rights reserved.
//

import { Injectable } from '@nestjs/common';
import { CreateSalerDto } from './dto/create-saler.dto';
import { UpdateSalerDto } from './dto/update-saler.dto';
import { PrismaService } from '../prisma/prisma/prisma.service';

@Injectable()
export class SalersService {
  constructor(
    private prismaService: PrismaService,
  ) {}
  create(createSalerDto: CreateSalerDto) {
    return 'This action adds a new saler';
  }

  findAll() {
    return this.prismaService.order.findMany();
  }

  findOne(id: number) {
    return this.prismaService.order.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  update(id: number, updateSalerDto: UpdateSalerDto) {
    return `This action updates a #${id} saler`;
  }

  remove(id: number) {
    return `This action removes a #${id} saler`;
  }
}
