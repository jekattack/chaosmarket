import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Market } from '../entities/market.entity';

@Injectable()
export class MarketsService {
  constructor(
    @InjectRepository(Market)
    private marketRepository: Repository<Market>,
  ) {}

  async findAll(): Promise<Market[]> {
    return this.marketRepository.find();
  }

  async findOne(id: number): Promise<Market> {
    return this.marketRepository.findOne({ where: { id } });
  }

  async create(market: Partial<Market>): Promise<Market> {
    const newMarket = this.marketRepository.create(market);
    return this.marketRepository.save(newMarket);
  }

  async resolve(id: number, winningOutcomeId: number): Promise<Market> {
    const market = await this.findOne(id);
    market.resolved = true;
    market.winningOutcomeId = winningOutcomeId;
    return this.marketRepository.save(market);
  }
}