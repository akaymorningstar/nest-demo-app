import { PartialType } from '@nestjs/mapped-types';
import { CreateMyCartDto } from './create-my-cart.dto';

export class UpdateMyCartDto extends PartialType(CreateMyCartDto) {}
