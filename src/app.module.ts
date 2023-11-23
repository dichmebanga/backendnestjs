import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { UserEntity } from './users/user.entity';
import { CrawlModule } from './crawl/crawl.module';
import { CrawlsEntity } from './crawl/crawl.entity';
import { GatewayModule } from './gateway/gateway.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.HOST_SERVER,
      port: +process.env.PORT_SERVER,
      username: process.env.USER_SERVER,
      password: process.env.PASSWORD_SERVER,
      database: process.env.DB_SERVER,
      entities: [UserEntity, CrawlsEntity],
      synchronize: true,
      options: {
        encrypt: true,
        trustServerCertificate: true,
      },
    }),
    UsersModule,
    CrawlModule,
    GatewayModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
