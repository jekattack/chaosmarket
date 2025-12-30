import { BetsService } from './bets.service';
import { CreateBetDto } from './dto/create-bet.dto';
export declare class BetsController {
    private readonly betsService;
    constructor(betsService: BetsService);
    placeBet(req: any, body: CreateBetDto): Promise<{
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
    getUserBets(req: any): Promise<{
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
