// Usando TypeORM como ejemplo
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tokenId: number;

  @Column()
  uuid: string;

  @Column()
  sku: string;

  @Column()
  timestamp: number;

  @Column()
  detail: number;

  @Column()
  input: number;

  @Column()
  unitCost: number;

  @Column()
  output: number;

  @Column()
  balance: number;

  @Column()
  totalCost: number;

  @Column()
  ppp: number;
}
