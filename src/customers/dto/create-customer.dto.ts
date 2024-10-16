import { IsString, IsEmail, IsNumber, IsObject } from 'class-validator';

export class CreateCustomerDto {
    @IsNumber()
    customer_id:number;

    @IsString()
    first_name:string;

    @IsString()
    last_name:string;

    @IsNumber()
    age:number;

    @IsString()
    country:string;

}
