import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bet } from '../entities/bet.entity';
import { Market } from '../entities/market.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class BetsService {
  constructor(
    @InjectRepository(Bet)
    private betRepository: Repository<Bet>,
    @InjectRepository(Market)
    private marketRepository: Repository<Market>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async placeBet(userId: number, marketId: number, outcomeId: number, amount: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const market = await this.marketRepository.findOne({ where: { id: marketId } });
    if (!market) throw new NotFoundException('Market not found');
    if (market.resolved) throw new BadRequestException('Market already resolved');

    const outcome = market.outcomes.find(o => o.id === outcomeId);
    if (!outcome) throw new BadRequestException('Invalid outcome');

    const bet = this.betRepository.create({ user, market, outcomeId, amount });
    return this.betRepository.save(bet);
  }

  async findByUser(userId: number) {
    const bets = await this.betRepository.find({ where: { user: { id: userId } }, relations: ['market'] });
    // Sanitize output to avoid circular refs and sensitive data
    return bets.map(b => ({
      id: b.id,
      market: b.market && ({
        id: b.market.id,
        question: b.market.question,
        outcomes: b.market.outcomes,
        resolved: b.market.resolved,
        winningOutcomeId: b.market.winningOutcomeId,
      }),
      outcomeId: b.outcomeId,
      amount: b.amount,
    }));
  }
}
