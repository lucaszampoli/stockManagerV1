import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MulterModule } from '@nestjs/platform-express';
import multer = require('multer');
import path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + Math.random() + path.extname(file.originalname));
  },
});

@Module({
  imports: [
    MulterModule.register({
      storage,
    }),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
