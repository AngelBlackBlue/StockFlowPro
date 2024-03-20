import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
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
  @Column({ unique: true, type: 'uuid' })
  userId: string; //[ref: > user.id]
  @DeleteDateColumn()
  deletedAt: Date;
}
