import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerName: string;

  @Column()
  product: string;

  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount: number;

  @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
  saleDate: Date;
}
