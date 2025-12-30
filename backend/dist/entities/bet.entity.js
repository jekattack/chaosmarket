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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bet = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const market_entity_1 = require("./market.entity");
let Bet = class Bet {
};
exports.Bet = Bet;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Bet.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.bets),
    __metadata("design:type", user_entity_1.User)
], Bet.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => market_entity_1.Market, market => market.bets),
    __metadata("design:type", market_entity_1.Market)
], Bet.prototype, "market", void 0);
__decorate([
    (0, typeorm_1.Column)('integer'),
    __metadata("design:type", Number)
], Bet.prototype, "outcomeId", void 0);
__decorate([
    (0, typeorm_1.Column)('real'),
    __metadata("design:type", Number)
], Bet.prototype, "amount", void 0);
exports.Bet = Bet = __decorate([
    (0, typeorm_1.Entity)()
], Bet);
//# sourceMappingURL=bet.entity.js.map