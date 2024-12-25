import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Transaction1735104704711 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transaction',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'customer_id',
            type: 'int',
          },
          {
            name: 'product_machine_id',
            type: 'int',
          },
          {
            name: 'stock_quantity',
            type: 'int',
          },
          {
            name: 'change_amount',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'paid_amount',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'status',
            type: 'varchar',
          },
          {
            name: 'sales_quantity',
            type: 'int',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['customer_id'],
            referencedTableName: 'customer',
            referencedColumnNames: ['id'],
          },
          {
            columnNames: ['product_machine_id'],
            referencedTableName: 'product_machine',
            referencedColumnNames: ['id'],
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('transaction');
  }
}
