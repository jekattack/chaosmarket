import { Repository } from 'typeorm';
import { Market } from '../entities/market.entity';
export declare class MarketsService {
    private marketRepository;
    constructor(marketRepository: Repository<Market>);
    findAll(): Promise<Market[]>;
    findOne(id: number): Promise<Market>;
    create(market: Partial<Market>): Promise<Market>;
    resolve(id: number, winningOutcomeId: number): Promise<Market>;
}
