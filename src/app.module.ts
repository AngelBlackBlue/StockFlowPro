import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CustomersModule } from './customers/customers.module';
import { ConfigModule} from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true,}),
    DatabaseModule,
    AuthModule,
    UsersModule,
    CustomersModule,
    CloudinaryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

