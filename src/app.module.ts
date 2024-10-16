import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerEntity } from './customers/entities/customer.entity'; // Replace with your entity
import { DataSource } from 'typeorm';
import { CustomersService } from './customers/customers.service';
import { CustomersController } from './customers/customers.controller';
import { ProductsModule } from './products/products.module';
import { ProductEntity } from './products/entities/product.entity';
import { CustomersModule } from './customers/customers.module';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { MyCartModule } from './my-cart/my-cart.module';
import { MyCartEntity } from './my-cart/entities/my-cart.entity';
import { MyCartController } from './my-cart/my-cart.controller';
import { MyCartService } from './my-cart/my-cart.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost', // Change this to your MongoDB host
      port: 27017, // Default MongoDB port
      // username: 'your_username', // Your MongoDB username
      // password: 'your_password', // Your MongoDB password
      database: 'Customers', // Your MongoDB database name
      entities: [CustomerEntity,ProductEntity,MyCartEntity], // Add your entities here
      synchronize: true, // Set to false in production
    }),
    TypeOrmModule.forFeature([CustomerEntity,ProductEntity,MyCartEntity]),
    CustomersModule,ProductsModule, MyCartModule, // Register your entity here
  ],
  controllers: [AppController,CustomersController,ProductsController,MyCartController],
  providers: [AppService,CustomersService,ProductsService,MyCartService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {
    const AppDataSource = new DataSource({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'Customers',
    })
  
    AppDataSource.initialize()
        .then(() => {
            console.log("Data Source has been initialized!")
        })
        .catch((err) => {
            console.error("Error during Data Source initialization", err)
        })
    }
}
