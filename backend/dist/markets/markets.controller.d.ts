import { MarketsService } from './markets.service';
import { CreateMarketDto } from './dto/create-market.dto';
export declare class MarketsController {
    private readonly marketsService;
    constructor(marketsService: MarketsService);
    findAll(): Promise<import("../entities/market.entity").Market[]>;
    findOne(id: string): Promise<import("../entities/market.entity").Market>;
    create(body: CreateMarketDto): Promise<import("../entities/market.entity").Market>;
    resolve(id: string, body: {
        winningOutcomeId: number;
    }): Promise<import("../entities/market.entity").Market>;
}
