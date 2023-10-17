//
// Created by Lucas V A Zampoli o 17/10/23.
// Copyright 2023 &copy; Zampo: All rights reserved.
//

import {
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  Headers,
  Patch,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: any) {
    return await this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('get/user/logged')
  async getUserLogged(@Headers('Authorization') auth: string) {
    const jwt = auth.replace('Bearer ', '');
    return await this.authService.getLoggedUser(jwt);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('alter/user/data')
  async alterUserData(@Body() info: any) {
    return await this.authService.alterUser(info);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('change/password')
  async changePasswordLogged(
    @Headers('Authorization') auth: string,
    @Body() passwords: any,
  ) {
    const jwt = auth.replace('Bearer ', '');
    return await this.authService.changePassword(jwt, passwords);
  }
}
