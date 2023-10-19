//
// Created by Lucas V A Zampoli o 17/10/23.
// Copyright 2023 &copy; Zampo: All rights reserved.
//

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './authMiddleware/auth.module';
import { UsersService } from 'src/users/users.service';
import { ProductsModule } from './products/products.module';
import { CommunicationModule } from './communication/communication.module';
import { CommunicationService } from './communication/communication.service';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    ProductsModule,
    CommunicationModule,
  ],
  controllers: [AppController],
  providers: [AppService, UsersService, CommunicationService],
})
export class AppModule {}

