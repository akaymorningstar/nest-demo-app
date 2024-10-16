import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productsRepository: Repository<ProductEntity>,
  ){}

  // create(createProductDto: CreateProductDto) {
  //   return 'This action adds a new product';
  // }

  findAll(): Promise<ProductEntity[]> {
    return this.productsRepository.find({
      order: {
        product_name: 'ASC',
        product_price: 'ASC',
      },
    });
  }

  findOne(id: number): Promise<ProductEntity> {
    return this.productsRepository.findOne({ where: { id } });
  }
}
