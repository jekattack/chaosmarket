import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Bet } from './bet.entity';

export type MarketOutcome = {
  id: number;
  name: string;
  odds: number;
};

@Entity()
export class Market {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column('simple-json')
  outcomes: MarketOutcome[];

  @Column({ default: false })
  resolved: boolean;

  @Column({ type: 'integer', nullable: true })
  winningOutcomeId: number | null;

  @OneToMany(() => Bet, bet => bet.market)
  bets: Bet[];
}