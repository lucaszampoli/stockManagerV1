import { Product } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { basename } from 'path';

export class ProductSerializer {
  id: number;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  price: number;
  description: string;
  image_path: string;

  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    this.sku = product.sku;
    this.category = product.category;
    this.quantity = Number(product.quantity);
    this.price = Number(product.price);
    this.description = product.description;
    this.image_path =
      // eslint-disable-next-line prettier/prettier
      'http://localhost:5000/api/v1/products/file/' + basename(product.image_path);
  }
}
