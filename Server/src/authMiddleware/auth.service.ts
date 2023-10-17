import { Injectable } from '@nestjs/common';
import { UsersEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async login(user) {
    const payload = { sub: user.id, email: user.email, name: user.name };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string) {
    let user: UsersEntity;
    try {
      user = await this.userService.findByEmail(email);
    } catch (error) {
      return null;
    }

    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) return null;

    return user;
  }

  async getLoggedUser(jwt: string) {
    const token = await this.jwtService.decode(jwt, { json: true });
    let user: UsersEntity;
    try {
      user = await this.userService.findByEmail(token['email']);
    } catch (error) {
      return null;
    }

    return user;
  }

  async alterUser(info) {
    let user: UsersEntity;
    try {
      user = await this.userService.findByEmail(info.email);
      const data = {
        name: info.name,
        email: user.email,
        profile: user.profile,
        status: user.status,
        password: user.password,
      };
      user = await this.userService.updateSpecificData(user.id, data);
    } catch (error) {
      return null;
    }

    return user;
  }

  async changePassword(jwt: string, passwords) {
    const token = await this.jwtService.decode(jwt, { json: true });
    const user = await this.userService.findByEmail(token['email']);
    const isPasswordValid = compareSync(passwords.oldPassword, user.password);
    if (!isPasswordValid) return null;

    const data = {
      name: user.name,
      email: user.email,
      profile: user.profile,
      status: user.status,
      password: passwords.password,
    };

    await this.userService.update(user.id, data);

    return true;
  }
}
