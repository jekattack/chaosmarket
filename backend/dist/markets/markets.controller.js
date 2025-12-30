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
exports.MarketsController = void 0;
const common_1 = require("@nestjs/common");
const markets_service_1 = require("./markets.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const create_market_dto_1 = require("./dto/create-market.dto");
let MarketsController = class MarketsController {
    constructor(marketsService) {
        this.marketsService = marketsService;
    }
    findAll() {
        return this.marketsService.findAll();
    }
    findOne(id) {
        return this.marketsService.findOne(+id);
    }
    create(body) {
        const outcomes = (body.outcomes || []).map((o, idx) => ({ id: idx + 1, name: o.name, odds: o.odds }));
        return this.marketsService.create({ question: body.question, outcomes });
    }
    resolve(id, body) {
        return this.marketsService.resolve(+id, body.winningOutcomeId);
    }
};
exports.MarketsController = MarketsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MarketsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MarketsController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_market_dto_1.CreateMarketDto]),
    __metadata("design:returntype", void 0)
], MarketsController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':id/resolve'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], MarketsController.prototype, "resolve", null);
exports.MarketsController = MarketsController = __decorate([
    (0, common_1.Controller)('markets'),
    __metadata("design:paramtypes", [markets_service_1.MarketsService])
], MarketsController);
//# sourceMappingURL=markets.controller.js.map