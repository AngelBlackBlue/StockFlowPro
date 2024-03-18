import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CustomersModule } from './customers/customers.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'user_angel',
      password: 'root',
      database: 'stock_flow_pro',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CustomersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
