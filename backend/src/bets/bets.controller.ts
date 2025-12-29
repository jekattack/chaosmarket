import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { BetsService } from './bets.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateBetDto } from './dto/create-bet.dto';
import { Body, UsePipes, ValidationPipe } from '@nestjs/common';

@Controller('bets')
export class BetsController {
  constructor(private readonly betsService: BetsService) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  async placeBet(@Request() req, @Body() body: CreateBetDto) {
    const userId = req.user.userId;
    return this.betsService.placeBet(userId, body.marketId, body.outcomeId, body.amount);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getUserBets(@Request() req) {
    const userId = req.user.userId;
    return this.betsService.findByUser(userId);
  }
}
