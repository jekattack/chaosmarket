import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MarketsModule } from './markets/markets.module';
import { BetsModule } from './bets/bets.module';
import { User } from './entities/user.entity';
import { Market } from './entities/market.entity';
import { Bet } from './entities/bet.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [User, Market, Bet],
      synchronize: true,
    }),
    AuthModule,
    MarketsModule,
    BetsModule,
  ],
})
export class AppModule {}