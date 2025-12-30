"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BetsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bet_entity_1 = require("../entities/bet.entity");
const market_entity_1 = require("../entities/market.entity");
const user_entity_1 = require("../entities/user.entity");
let BetsService = class BetsService {
    constructor(betRepository, marketRepository, userRepository) {
        this.betRepository = betRepository;
        this.marketRepository = marketRepository;
        this.userRepository = userRepository;
    }
    async placeBet(userId, marketId, outcomeId, amount) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const market = await this.marketRepository.findOne({ where: { id: marketId } });
        if (!market)
            throw new common_1.NotFoundException('Market not found');
        if (market.resolved)
            throw new common_1.BadRequestException('Market already resolved');
        const outcome = market.outcomes.find(o => o.id === outcomeId);
        if (!outcome)
            throw new common_1.BadRequestException('Invalid outcome');
        if (typeof amount !== 'number' || amount <= 0) {
            throw new common_1.BadRequestException('Invalid amount');
        }
        const bet = this.betRepository.create({ user, market, outcomeId, amount });
        const saved = await this.betRepository.save(bet);
        return {
            id: saved.id,
            market: {
                id: market.id,
                question: market.question,
                outcomes: market.outcomes,
                resolved: market.resolved,
                winningOutcomeId: market.winningOutcomeId,
            },
            outcomeId: saved.outcomeId,
            amount: saved.amount,
        };
    }
    async findByUser(userId) {
        const bets = await this.betRepository.find({ where: { user: { id: userId } }, relations: ['market'] });
        return bets.map(b => ({
            id: b.id,
            market: b.market && ({
                id: b.market.id,
                question: b.market.question,
                outcomes: b.market.outcomes,
                resolved: b.market.resolved,
                winningOutcomeId: b.market.winningOutcomeId,
            }),
            outcomeId: b.outcomeId,
            amount: b.amount,
        }));
    }
};
exports.BetsService = BetsService;
exports.BetsService = BetsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(bet_entity_1.Bet)),
    __param(1, (0, typeorm_1.InjectRepository)(market_entity_1.Market)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], BetsService);
//# sourceMappingURL=bets.service.js.map