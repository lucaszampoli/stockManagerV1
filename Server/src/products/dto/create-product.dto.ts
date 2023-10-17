import { Decimal } from '@prisma/client/runtime/library';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
// import { MessagesHelper } from '../../helpers/messages.helper';
// import { RegExHelper } from '../../helpers/regex.helper';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  sku: string;

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  price: Decimal;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  image_path: string;
}
