import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

import { CreateInitialData } from './initial-data.seeder';
import { getConfigDatabase } from 'src/infrastructure/config/typeorm/typeorm.config';

const env = process.env.NODE_ENV || 'development';
const envFile = `.env`;
config({ path: join(__dirname, '..', '..', envFile) });

const configService = new ConfigService();

const entityPath = [
  join(
    __dirname,
    '../../src/infrastructure/entities',
    '**',
    '*.entity.{js,ts}',
  ),
];
const migrations = [join(__dirname, '../../database/migrations', '*.{js,ts}')];

async function runSeeder() {
  const config = getConfigDatabase(
    configService,
    entityPath,
    migrations,
  ) as DataSourceOptions;
  const dataSource = new DataSource(config);

  try {
    await dataSource.initialize();
    const initData = new CreateInitialData();
    console.log('======== Start seed table status =====');
    await initData.run(dataSource);
    console.log('Seeding completed!');
  } catch (error) {
    console.error('Error during seeding', error);
  } finally {
    await dataSource.destroy();
  }
}

runSeeder().catch((error) => console.error(error));
