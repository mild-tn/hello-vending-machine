import { Logger } from '@nestjs/common';
import { join } from 'path';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

import { ConfigService } from '@nestjs/config';

// Load environment variables from .env file
console.log('Loading environment variables from .env file', __dirname);
const envFile = join(__dirname, '../../../../', '.env');
dotenv.config({ path: envFile });

export const entityPath = [
  join(
    __dirname,
    '../../../../',
    'src',
    'infrastructure',
    'entities',
    '**',
    '*.entity.ts',
  ),
];
export const migrationPath = [
  join(__dirname, '../../../../', 'database', 'migrations', '**', '*.ts'),
];

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: entityPath,
  synchronize: false,
  schema: process.env.DATABASE_SCHEMA,
  migrationsRun: true,
  migrations: migrationPath,
});

export const getConfigDatabase = (
  configService: ConfigService,
  entityPath: string[],
  migrationPath: string[],
) => {
  return {
    type: 'postgres',
    host: configService.get<string>('DATABASE_HOST') || 'localhost',
    port: configService.get<number>('DATABASE_PORT') || 5432,
    username: configService.get<string>('DATABASE_USER') || 'api',
    password: configService.get<string>('DATABASE_PASSWORD') || 'api',
    database:
      configService.get<string>('DATABASE_NAME') || 'finance_services_db',
    entities: entityPath,
    migrations: migrationPath,
    synchronize: false,
    logging: true,
  };
};

Logger.log(`entity path: ${entityPath}`);
Logger.log(`migration path: ${migrationPath}`);
AppDataSource.initialize()
  .then(() => {
    Logger.log('Data Source has been initialized!');
  })
  .catch((err) => {
    Logger.error('Error during Data Source initialization', err);
  });
