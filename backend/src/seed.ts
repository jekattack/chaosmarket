import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { Market } from './entities/market.entity';
import * as bcrypt from 'bcrypt';

async function run() {
  const dataSource = new DataSource({
    type: 'sqlite',
    database: 'database.sqlite',
    entities: [User, Market],
    synchronize: true,
  });

  await dataSource.initialize();

  const userRepo = dataSource.getRepository(User);
  const marketRepo = dataSource.getRepository(Market);

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
