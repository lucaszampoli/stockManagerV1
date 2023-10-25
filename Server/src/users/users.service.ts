//
// Created by Lucas V A Zampoli o 17/10/23.
// Copyright 2023 &copy; Zampo: All rights reserved.
//

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
//import { Prisma } from '@prisma/client';
import { CommunicationService } from 'src/communication/communication.service';

@Injectable()
export class UsersService {
  constructor(
    private prismaService: PrismaService,
    private readonly communicationService: CommunicationService,
  ) {}

  // Create user or cria usuario
  async create(createUserDto: CreateUserDto) {
    const data = {
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

  // Search All users or busca por todos usuarios
  findAll() {
    return this.prismaService.user.findMany();
  }

  // Search user by id or busca por usuario pelo id
  findOne(id: number) {
    return this.prismaService.user.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  // Search user by email or busca por usuario pelo email
  async findByEmail(email: string) {
    return this.prismaService.user.findUniqueOrThrow({
      where: {
        email,
      },
    });
  }

  //Update User or Atualiza usuario
  async update(id: number, updateUserDto: UpdateUserDto) {
    const data = {
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

  //Update User with specific data or Atualiza usuario com informaçoes especificas para preservar a senha atual
  async updateSpecificData(id: number, updateUserDto: UpdateUserDto) {
    const data = {
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

  //Delete User or Deleta usuario
  remove(id: number) {
    return this.prismaService.user.delete({
      where: { id },
    });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const data = {
      name: updateUserDto.name,
      profile: updateUserDto.profile,
      status: updateUserDto.status,
    };
    return this.prismaService.user.update({
      where: { id },
      data: data,
    });
  }

  //Forgot password or recuperação de senha
  async sendForgotCommunication(email) {
    try {
      const user = await this.findByEmail(email.email);
      if (user) {
        const fixed = 'J@123';
        const generatePassword =
          fixed + (Math.random() + 1).toString(36).substring(7);
        console.log('random', generatePassword);
        const data = {
          name: user.name,
          email: user.email,
          profile: user.profile,
          status: user.status,
          password: generatePassword,
        };
        const aux = await this.update(user.id, data);
        await this.communicationService.sendMail(user, generatePassword);
        return !aux ? null : true;
      }
    } catch (error) {
      return null;
    }
  }

  async createNewUsers(createUserDto) {
    const fixed = 'J@123';
    const generatePassword =
      fixed + (Math.random() + 1).toString(36).substring(7);
    console.log('random', generatePassword);
    const data = {
      name: createUserDto.name,
      email: createUserDto.email,
      profile: createUserDto.profile,
      status: createUserDto.status,
      password: generatePassword,
    };
    const aux = await this.create(data);
    await this.communicationService.sendMailForNewUser(
      data.email,
      generatePassword,
    );
    return aux;
  }
}
