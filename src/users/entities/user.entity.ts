import { Customer } from '../../customers/entities/customer.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../../common/enum/role.enum';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstname: string;

  @Column({ nullable: true })
  lastname: string;

  @Column({ unique: true, nullable: false })
  email: string; // [not null,unique]

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  company: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  cbu: string;

  @Column({ nullable: true })
  alias: string;

  @Column({ nullable: true })
  cuit: string;

  @Column({ nullable: true })
  validator: number;

  @Column({ nullable: true })
  status: string;

  @Column({ type: 'enum', default: Role.USER, enum: Role })
  role: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Customer, (customer) => customer.user)
  customer: Customer[];
}
