import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Bet } from './bet.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @OneToMany(() => Bet, bet => bet.user)
  bets: Bet[];
}