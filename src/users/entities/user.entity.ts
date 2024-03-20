import { Customer } from 'src/customers/entities/customer.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  email: string; // [not null,unique]

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  company: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  cbu: string;

  @Column({ nullable: true })
  alias: number;

  @Column({ nullable: true })
  cuit: string;

  @Column({ nullable: true })
  validator: number;

  @Column()
  status: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Customer, (customer) => customer.user)
  customer: Customer[];
}
