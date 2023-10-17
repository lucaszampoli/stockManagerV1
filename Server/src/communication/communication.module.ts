//
// Created by Lucas V A Zampoli o 17/10/23.
// Copyright 2023 &copy; Zampo: All rights reserved.
//

import { Module } from '@nestjs/common';
import { CommunicationService } from './communication.service';
import { CommunicationController } from './communication.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        auth: {
          user: 'julianibazar@gmail.com',
          pass: process.env.APP_SECRET_KEY,
        },
      },
    }),
  ],
  controllers: [CommunicationController],
  providers: [CommunicationService],
})
export class CommunicationModule {}
