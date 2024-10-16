import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity('mycart_details')
export class MyCartEntity {
    @ObjectIdColumn()
    id: number;
  
    @Column()
    userId: string;
  
    @Column('json')
    cartProducts: { productId: number; quantity: number }[];
  
    @Column({ default: 0 })
    totalAmount: number;
}
