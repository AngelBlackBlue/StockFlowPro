import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'customers' })
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20 })
  firstname: string;

  @Column({ nullable: true })
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

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.customer, {
    eager: true, // para que traiga las user al hacer un findOne
  })
  user: User;
}
