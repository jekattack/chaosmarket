declare class OutcomeDto {
    name: string;
    odds: number;
}
export declare class CreateMarketDto {
    question: string;
    outcomes: OutcomeDto[];
}
export {};
