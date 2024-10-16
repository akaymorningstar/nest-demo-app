import { ObjectId } from 'mongodb';
import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity('customers_details',{orderBy: {first_name: "ASC"}})

export class CustomerEntity {
    @ObjectIdColumn()
    id:ObjectId;

    @Column()
    customer_id:number;

    @Column()
    first_name:string;

    @Column()
    last_name:string;

    @Column()
    age:number;

    @Column()
    country:string;
}