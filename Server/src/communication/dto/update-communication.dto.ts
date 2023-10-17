//
// Created by Lucas V A Zampoli o 17/10/23.
// Copyright 2023 &copy; Zampo: All rights reserved.
//

import { PartialType } from '@nestjs/mapped-types';
import { CreateCommunicationDto } from './create-communication.dto';

export class UpdateCommunicationDto extends PartialType(CreateCommunicationDto) {}
