import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BetsService } from './bets.service';
import { BetsController } from './bets.controller';
import { Bet } from '../entities/bet.entity';
import { Market } from '../entities/market.entity';
import { User } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bet, Market, User])],
  controllers: [BetsController],
  providers: [BetsService],
})
export class BetsModule {}
