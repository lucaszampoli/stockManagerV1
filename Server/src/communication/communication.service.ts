//
// Created by Lucas V A Zampoli o 17/10/23.
// Copyright 2023 &copy; Zampo: All rights reserved.
//

import { Injectable } from '@nestjs/common';
import { CreateCommunicationDto } from './dto/create-communication.dto';
import { UpdateCommunicationDto } from './dto/update-communication.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { UsersService } from 'src/users/users.service';
import { UsersEntity } from 'src/users/entities/user.entity';

@Injectable()
export class CommunicationService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly userService: UsersService,
  ) {}

  async sendCommunicatio(email) {
    let user: UsersEntity;
    try {
      user = await this.userService.findByEmail(email.email);
      if (user) {
        const fixed = 'J@123';
        const generatePassword = fixed + (Math.random() + 1).toString(36).substring(7);
        console.log('random', generatePassword);
        const data = {
          name: user.name,
          email: user.email,
          profile: user.profile,
          status: user.status,
          password: generatePassword,
        };
        await this.userService.update(user.id, data);
        await this.sendMail(user, generatePassword);
        return true;
      }
    } catch (error) {
      return null;
    }
    return true;
  }
  sendMail(user, generatePassword) {
    this.mailerService.sendMail({
      to: user.email,
      from: 'julianibazar@gmail.com',
      subject: 'Recuperação de senha Julliani Bazar',
      text: 'Utilize a senha abaixo:',
      html: '<b>Senha: </b>'+generatePassword,
    });
  }
}
