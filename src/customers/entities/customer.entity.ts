import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'customers' })
export class Customer {
  //   @PrimaryGeneratedColumn({ unique: true, type: 'uuid' })
  @PrimaryGeneratedColumn()
  id: string; //uuid [primary key]
  @Column()
  firstname: string;
  @Column()
  lastname: string;
  @Column({ nullable: true })
  description: string; // text;
  @Column({ unique: true })
  email: string; // [not null,unique]
  @Column()
  phone: string;
  @Column({ nullable: true })
  company: string;
  @Column({ nullable: true })
  image: string;
  @Column({ nullable: true })
  address: string;
  @Column({ nullable: true })
  number: number;
  @Column({ nullable: true })
  location: string;
  @Column({ nullable: true })
  province: string;
  @Column({ unique: true, type: 'uuid' })
  userId: string; //[ref: > user.id]
}
