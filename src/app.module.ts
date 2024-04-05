import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CustomersModule } from './customers/customers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE,
      host: 'localhost',
      port: 3307,
      username: 'user_angel',
      password: 'root',
      database: 'stock_flow_pro',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    CustomersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
