import { Bet } from './bet.entity';
export declare class User {
    id: number;
    email: string;
    password: string;
    name: string;
    bets: Bet[];
}
