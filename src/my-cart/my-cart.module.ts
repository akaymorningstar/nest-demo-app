import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MyCartEntity } from './entities/my-cart.entity';
import { MyCartService } from './my-cart.service';
import { MyCartController } from './my-cart.controller';
import { ProductEntity } from 'src/products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MyCartEntity,ProductEntity])],
  controllers: [MyCartController],
  providers: [MyCartService],
})
export class MyCartModule {}
