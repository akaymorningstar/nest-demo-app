import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { MyCartService } from './my-cart.service';
import { MyCartEntity } from './entities/my-cart.entity';
import { CreateMyCartDto } from './dto/create-my-cart.dto';
import { UpdateMyCartDto } from './dto/update-my-cart.dto';

@Controller('my-cart')
export class MyCartController {
  constructor(private readonly myCartService: MyCartService) {}

  @Post('add')
  async addToCart(@Body() addToCartDto: CreateMyCartDto): Promise<MyCartEntity> {
    try {
      return await this.myCartService.addToCart(addToCartDto);
    } catch (error) {
      // Log the error or send a specific response
      console.error('Error in addToCart controller:', error);
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':userId/products')
  async getMyCartProducts(@Param('userId') user_Id: string) {
      return this.myCartService.getUserProductsWithTotalAmount(user_Id);
  }

  // @Post()
  // create(@Body() createMyCartDto: CreateMyCartDto) {
  //   return this.myCartService.create(createMyCartDto);
  // }

  // @Get()
  // findAll() {
  //   return this.myCartService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.myCartService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMyCartDto: UpdateMyCartDto) {
  //   return this.myCartService.update(+id, updateMyCartDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.myCartService.remove(+id);
  // }
}
