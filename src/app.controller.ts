import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CustomersService } from './customers/customers.service';

@Controller('Hello')
export class AppController {
  constructor(private readonly appService: AppService, private customersService:CustomersService) {}

  @Get()
  getHello():Promise<any> {
    // return 'Hello World!!';
    // return this.appService.getHello();
    return this.customersService.findAll();
  }
}
