import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const data: Prisma.UserCreateInput = {
      name: createUserDto.name,
      email: createUserDto.email,
      profile: createUserDto.profile,
      status: createUserDto.status,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    return this.prismaService.user.create({
      data,
    });
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  findOne(id: number) {
    return this.prismaService.user.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prismaService.user.findUniqueOrThrow({
      where: {
        email,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const data: Prisma.UserUpdateInput = {
      name: updateUserDto.name,
      email: updateUserDto.email,
      profile: updateUserDto.profile,
      status: updateUserDto.status,
      password: await bcrypt.hash(updateUserDto.password, 10),
    };
    return this.prismaService.user.update({
      where: { id },
      data: data,
    });
  }

  async updateSpecificData(id: number, updateUserDto: UpdateUserDto) {
    const data: Prisma.UserUpdateInput = {
      name: updateUserDto.name,
      email: updateUserDto.email,
      profile: updateUserDto.profile,
      status: updateUserDto.status,
      password: updateUserDto.password,
    };
    return this.prismaService.user.update({
      where: { id },
      data: data,
    });
  }

  remove(id: number) {
    return this.prismaService.user.delete({
      where: { id },
    });
  }
}
