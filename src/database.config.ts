import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  name: 'sqlserver2022-container',
  type: 'mssql',
  host: 'localhost',
  port: 1434,
  username: 'sa',
  password: 'Abc12313456789@',
  database: 'db1',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};