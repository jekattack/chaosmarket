import { User } from './user.entity';
import { Market } from './market.entity';
export declare class Bet {
    id: number;
    user: User;
    market: Market;
    outcomeId: number;
    amount: number;
}
