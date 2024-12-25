import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class MachineCoinAndBanknote1735104499031 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'machine_coin_and_banknote',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'machine_id',
            type: 'int',
          },
          {
            name: 'coin_and_banknote_id',
            type: 'int',
          },
          {
            name: 'quantity',
            type: 'int',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['machine_id'],
            referencedTableName: 'machine',
            referencedColumnNames: ['id'],
          },
          {
            columnNames: ['coin_and_banknote_id'],
            referencedTableName: 'coin_and_banknote',
            referencedColumnNames: ['id'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('machine_coin_and_banknote');
  }
}
