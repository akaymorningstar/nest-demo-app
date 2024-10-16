import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMyCartDto {
    @IsNotEmpty()
    @IsNumber()
    user_id: string;

    @IsNotEmpty()
    @IsNumber()
    product_id: number;

    @IsNotEmpty()
    @IsNumber()
    product_quantity: number;
}
