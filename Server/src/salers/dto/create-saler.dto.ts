import { Decimal } from "@prisma/client/runtime/library";
import { IsNotEmpty } from "class-validator";

export class CreateSalerDto {
  // @IsNotEmpty()
  // user_id: number;

  // @IsNotEmpty()
  // payment_method: string;

  // @IsNotEmpty()
  // total: Decimal;

  // @IsNotEmpty()
  // date_added: Date;

  // @IsNotEmpty()
  // date_modified: Date;

  @IsNotEmpty()
  order_id: number;

  @IsNotEmpty()
  product_id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  price: Decimal;

  @IsNotEmpty()
  total: Decimal;

}
