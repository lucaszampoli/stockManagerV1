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
