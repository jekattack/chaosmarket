import { Controller, Get, Post, Body, Param, Patch, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { MarketsService } from './markets.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateMarketDto } from './dto/create-market.dto';

@Controller('markets')
export class MarketsController {
  constructor(private readonly marketsService: MarketsService) {}

  @Get()
  findAll() {
    return this.marketsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.marketsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Post()
  create(@Body() body: CreateMarketDto) {
    const outcomes = (body.outcomes || []).map((o, idx) => ({ id: idx + 1, name: o.name, odds: o.odds }));
    return this.marketsService.create({ question: body.question, outcomes });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/resolve')
  resolve(@Param('id') id: string, @Body() body: { winningOutcomeId: number }) {
    return this.marketsService.resolve(+id, body.winningOutcomeId);
  }
}