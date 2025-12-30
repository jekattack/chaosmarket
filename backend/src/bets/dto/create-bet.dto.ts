import { IsInt, IsNumber, Min } from 'class-validator';

export class CreateBetDto {
  @IsInt()
  marketId: number;

  @IsInt()
  outcomeId: number;

  @IsNumber()
  @Min(0.01)
  amount: number;
}

