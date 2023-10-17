import { Controller, Get, Post, Body } from '@nestjs/common';
import { CommunicationService } from './communication.service';
//import { CreateCommunicationDto } from './dto/create-communication.dto';

@Controller('api/v1/communication')
export class CommunicationController {
  constructor(private readonly communicationService: CommunicationService) {}

  @Post()
  async create(@Body() email) {
    return await this.communicationService.sendCommunicatio(email);
  }

  // @Get()
  // sendMail() {
  //   return this.communicationService.sendMail();
  // }
}
