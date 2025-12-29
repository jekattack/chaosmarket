import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Market } from './market.entity';

@Entity()
export class Bet {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.bets)
  user: User;

  @ManyToOne(() => Market, market => market.bets)
  market: Market;

  @Column('integer')
  outcomeId: number;

  @Column('real')
  amount: number;
}