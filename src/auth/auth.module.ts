import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>('JWT_SECRET'),
      global: true,
      signOptions: { expiresIn: configService.get<string>('JWT_EXPIRESIN') },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtModule]
})
export class AuthModule {}


// import { Module } from '@nestjs/common';
// import { AuthController } from './auth.controller';
// import { UsersModule } from 'src/users/users.module';
// import { AuthService } from './auth.service';
// import { JwtModule } from '@nestjs/jwt';
// import { jwtConstants } from './constants/jwt.constants';

// @Module({
//   imports: [
//     UsersModule,
//     JwtModule.register({
//       global: true,
//       secret: jwtConstants.secret,
//       signOptions: { expiresIn: jwtConstants.expiresIn },
//     }),
//   ],
//   controllers: [AuthController],
//   providers: [AuthService],
// })
// export class AuthModule {}
