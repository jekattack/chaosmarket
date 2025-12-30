import { Repository } from 'typeorm';
import { Bet } from '../entities/bet.entity';
import { Market } from '../entities/market.entity';
import { User } from '../entities/user.entity';
export declare class BetsService {
    private betRepository;
    private marketRepository;
    private userRepository;
    constructor(betRepository: Repository<Bet>, marketRepository: Repository<Market>, userRepository: Repository<User>);
    placeBet(userId: number, marketId: number, outcomeId: number, amount: number): Promise<{
        id: number;
        market: {
            id: number;
            question: string;
            outcomes: import("../entities/market.entity").MarketOutcome[];
            resolved: boolean;
            winningOutcomeId: number;
        };
        outcomeId: number;
        amount: number;
    }>;
    findByUser(userId: number): Promise<{
        id: number;
        market: {
            id: number;
            question: string;
            outcomes: import("../entities/market.entity").MarketOutcome[];
            resolved: boolean;
            winningOutcomeId: number;
        };
        outcomeId: number;
        amount: number;
    }[]>;
}
