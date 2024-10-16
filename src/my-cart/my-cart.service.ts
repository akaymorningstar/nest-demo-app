import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { MyCartEntity } from './entities/my-cart.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import { CreateMyCartDto } from './dto/create-my-cart.dto';
import { UpdateMyCartDto } from './dto/update-my-cart.dto';
import { MongoRepository } from 'typeorm';

@Injectable()
export class MyCartService {
  constructor(
    @InjectRepository(MyCartEntity)
    private cartRepository: Repository<MyCartEntity>,
    @InjectRepository(ProductEntity)
    private productsRepository: MongoRepository<ProductEntity>
  ) {}

  async addToCart(addToCartDto: CreateMyCartDto): Promise<MyCartEntity> {
    try {
      const { user_id, product_id, product_quantity } = addToCartDto;
  
      let cart = await this.cartRepository.findOne({ where: { userId: user_id } });
  
      if (!cart) {
        cart = this.cartRepository.create({
          userId: user_id,
          cartProducts: [{ productId: product_id, quantity: product_quantity }],
          totalAmount: product_quantity,
        });
      } else {
        const productIndex = cart.cartProducts.findIndex(item => item.productId === product_id);
  
        if (productIndex > -1) {
          cart.cartProducts[productIndex].quantity += product_quantity;
        } else {
          cart.cartProducts.push({ productId: product_id, quantity: product_quantity });
        }
  
        cart.totalAmount += product_quantity; // Adjust this logic if needed
      }
      console.log('Cart object before saving:', cart);
      return await this.cartRepository.save(cart);
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw new Error('Could not add to cart'); // Customize the error message if needed
    }
  }

  async getUserProductsWithTotalAmount(user_Id: string) {
    const cart = await this.cartRepository.findOne({ where: { userId: user_Id } });
    if (!cart || !cart.cartProducts || cart.cartProducts.length === 0) {
        return { products: [], total_amount: 0 }; // Handle case where cart or products do not exist
    }

     // Extract product IDs and quantities from user.products
     const productDetails = cart.cartProducts.map(p => ({
      product_id: p.productId,
      quantity: p.quantity
    }));

    // Fetch products using the `find` method with `$in` operator
    const productIds = productDetails.map(pd => pd.product_id);
    const products = await this.productsRepository.find({
      where: { id: { $in: productIds } }
    });

    // Combine product details with quantities
    const productsWithQuantities = products.map(product => {
      const detail = productDetails.find(pd => pd.product_id === product.id);
      return {
          ...product, // Spread existing product properties
          quantity: detail ? detail.quantity : 0 // Add quantity from productDetails
      };
    });

    // Calculate total amount
    const totalAmount = products.reduce((total, product) => {
        const productDetail = productDetails.find(pd => pd.product_id === product.id);
        return total + (product.product_price * (productDetail ? productDetail.quantity : 0));
    }, 0);

    return { products: productsWithQuantities, total_amount: totalAmount };
}
  // create(createMyCartDto: CreateMyCartDto) {
  //   return 'This action adds a new myCart';
  // }

  // findAll() {
  //   return `This action returns all myCart`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} myCart`;
  // }

  // update(id: number, updateMyCartDto: UpdateMyCartDto) {
  //   return `This action updates a #${id} myCart`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} myCart`;
  // }
}
