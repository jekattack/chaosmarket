"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const markets_module_1 = require("./markets/markets.module");
const bets_module_1 = require("./bets/bets.module");
const user_entity_1 = require("./entities/user.entity");
const market_entity_1 = require("./entities/market.entity");
const bet_entity_1 = require("./entities/bet.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'sqlite',
                database: 'database.sqlite',
                entities: [user_entity_1.User, market_entity_1.Market, bet_entity_1.Bet],
                synchronize: true,
            }),
            auth_module_1.AuthModule,
            markets_module_1.MarketsModule,
            bets_module_1.BetsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map