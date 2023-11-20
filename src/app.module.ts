import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { UserEntity } from './modules/users/user.entity';

@Module({
  // imports: [
  //   UsersModule,
  //   TypeOrmModule.forRoot({
  //     name: 'sqlserver2022-container', // Tên kết nối cho SQL Server
  //     type: 'mssql',
  //     host: 'localhost', // Tên container của SQL Server trong Docker Compose
  //     port: 1434, // Port đã đặt trong Docker Compose
  //     username: 'sa',
  //     password: 'Abc12313456789@',
  //     database: 'db1',
  //     entities: [UserEntity],
  //     synchronize: true,
  //     options: {
  //       encrypt: true,
  //       trustServerCertificate: true, // Thêm dòng này
  //     },
  //   }),
  // ],
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1434,
      username: 'sa',
      password: 'Abc12313456789@',
      database: 'db1',
      entities: [UserEntity],
      synchronize: true,
      options: {
        encrypt: true,
        trustServerCertificate: true, // Thêm dòng này
      },
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
