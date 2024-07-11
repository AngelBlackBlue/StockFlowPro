import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CustomersModule } from './customers/customers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    CustomersModule,
    CloudinaryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}



// import { Module } from '@nestjs/common';
// import { UsersModule } from './users/users.module';
// import { CustomersModule } from './customers/customers.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule } from '@nestjs/config';
// import { AuthModule } from './auth/auth.module';
// import { CloudinaryModule } from './cloudinary/cloudinary.module';

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true,
//     }),
//     TypeOrmModule.forRoot({
//       type: 'mysql',
//       host: process.env.DB_HOSTE,
//       port: parseInt(process.env.DB_PORT, 10),
//       username: process.env.DB_USER,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_DATABASE,
//       autoLoadEntities: true,
//       synchronize: true,
//     }),
//     AuthModule,
//     UsersModule,
//     CustomersModule,
//     CloudinaryModule,
//   ],
//   controllers: [],
//   providers: [],
// })
// export class AppModule {}

