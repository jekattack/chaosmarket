import { Bet } from './bet.entity';
export type MarketOutcome = {
    id: number;
    name: string;
    odds: number;
};
export declare class Market {
    id: number;
    question: string;
    outcomes: MarketOutcome[];
    resolved: boolean;
    winningOutcomeId: number | null;
    bets: Bet[];
}
