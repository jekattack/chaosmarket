import { IsString, IsArray, ValidateNested, ArrayMinSize, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

class OutcomeDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(0.01)
  odds: number;
}

export class CreateMarketDto {
  @IsString()
  question: string;

  @IsArray()
  @ArrayMinSize(2)
  @ValidateNested({ each: true })
  @Type(() => OutcomeDto)
  outcomes: OutcomeDto[];
}
