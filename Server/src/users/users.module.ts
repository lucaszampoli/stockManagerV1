//
// Created by Lucas V A Zampoli o 17/10/23.
// Copyright 2023 &copy; Zampo: All rights reserved.
//

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CommunicationModule } from 'src/communication/communication.module';
import { ConfigModule } from '@nestjs/config';
import { CommunicationService } from 'src/communication/communication.service';

@Module({
  imports: [ConfigModule.forRoot(), CommunicationModule],
  controllers: [UsersController],
  providers: [UsersService, CommunicationService],
  exports: [UsersService],
})
export class UsersModule {}
