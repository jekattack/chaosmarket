"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const market_entity_1 = require("./entities/market.entity");
const bet_entity_1 = require("./entities/bet.entity");
const bcrypt = require("bcrypt");
async function run() {
    const dataSource = new typeorm_1.DataSource({
        type: 'sqlite',
        database: 'database.sqlite',
        entities: [user_entity_1.User, market_entity_1.Market, bet_entity_1.Bet],
        synchronize: true,
    });
    await dataSource.initialize();
    const userRepo = dataSource.getRepository(user_entity_1.User);
    const marketRepo = dataSource.getRepository(market_entity_1.Market);
    const hashed = await bcrypt.hash('password', 10);
    const user = userRepo.create({ email: 'test@example.com', password: hashed, name: 'Test User' });
    await userRepo.save(user);
    const markets = [
        {
            question: 'Will Bitcoin be above $100k by end of 2026?',
            outcomes: [
                { id: 1, name: 'Yes', odds: 1.8 },
                { id: 2, name: 'No', odds: 2.0 },
            ],
        },
        {
            question: 'Will AI pass a human-level Turing test by 2027?',
            outcomes: [
                { id: 1, name: 'Yes', odds: 3.2 },
                { id: 2, name: 'No', odds: 1.3 },
            ],
        },
    ];
    for (const m of markets) {
        const ent = marketRepo.create({ question: m.question, outcomes: m.outcomes });
        await marketRepo.save(ent);
    }
    console.log('Seed complete');
    await dataSource.destroy();
}
run().catch(err => {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map