import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity({ name: 'stocks' })
export class Stock {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true})
    sku: string;

    @Column()
    product: string;

    @Column({nullable: true})
    description: string;

    @Column()
    amount: number;

    @Column({nullable: true})
    image: string;

    @Column()
    buyPrice: number;

    @Column({nullable: true})
    salePrice: number;





    // salePrice float
    // supplierId uuid [ref: > supplier.id]
    // userId uuid [ref: > user.id]
  
}
