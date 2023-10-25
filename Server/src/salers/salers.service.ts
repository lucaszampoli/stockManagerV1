//
// Created by Lucas V A Zampoli o 21/10/23.
// Copyright 2023 &copy; Zampo: All rights reserved.
//
//https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access

import { Injectable } from '@nestjs/common';
import { CreateSalerDto } from './dto/create-saler.dto';
import { UpdateSalerDto } from './dto/update-saler.dto';
import { PrismaService } from '../prisma/prisma/prisma.service';
import { prisma } from '../prisma/prisma.client';

//import { Prisma } from '@prisma/client';

@Injectable()
export class SalersService {
  constructor(
    private prismaService: PrismaService,
  ) {}
  create(createSalerDto: CreateSalerDto) {
    // let data: Prisma.OrderCreateInput = {
    //   user_id: createSalerDto.user_id,
    //   payment_method: createSalerDto.payment_method,
    //   total: createSalerDto.total,
    //   date_added: new Date(),
    //   date_modified: new Date(),
    // };

    //  return this.prismaService.order.create({
    //   data,
    // });

    // let data: Prisma.OrderProductCreateInput = {
    //   order_id: createSalerDto.order_id,
    //   product_id: createSalerDto.product_id,
    //   name: createSalerDto.name,
    //   quantity: createSalerDto.quantity,
    //   price: createSalerDto.price,
    //   total: createSalerDto.total,
    // };

    // return this.prismaService.orderProduct.create({
    //   data,
    // });
  }

  async findAll() {
    //return this.prismaService.order.findMany();
    //const order = 'Order';
    const prismaClient  = prisma;
    return await prismaClient.$queryRaw`SELECT od.id, 
                                         od.payment_method,
                                         od.total,
                                         od.date_added,
                                         us.name 
                                          FROM jullianibazar.Order as od 
                                          JOIN User as us ON od.user_id=us.id`;
    //return await prisma.$queryRawUnsafe('SELECT * FROM jullianibazar.Order as od JOIN User as us ON od.user_id=us.id');
  }

  async findOneOrder(id: number) {
    const prismaClient = prisma;
    return await prismaClient.$queryRaw`SELECT od.id, 
                                            od.payment_method,
                                            od.total,
                                            od.date_added,
                                            us.name
                                            FROM jullianibazar.Order as od 
                                            JOIN User as us ON od.user_id=us.id
                                          WHERE od.id = ${id}`
    //return await prisma.$queryRawUnsafe('SELECT * FROM jullianibazar.Order as od JOIN User as us ON od.user_id=us.id');
  }

  async findOneOrderProduct(order_id: number) {
    return await this.prismaService.orderProduct.findMany({
      where: {
        order_id: order_id,
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
