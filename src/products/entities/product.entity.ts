import { ObjectId } from 'mongodb';
import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity('products_details',{orderBy: {product_name: "ASC"}})

export class ProductEntity {
    @ObjectIdColumn()
    _id:ObjectId;

    @Column()
    id:number;

    @Column()
    product_name:string;

    @Column()
    product_description:string;

    @Column()
    imageUrls:[];

    @Column()
    product_img:string;

    @Column()
    product_price:number;

    @Column()
    product_details:string;
}