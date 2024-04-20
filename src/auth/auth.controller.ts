import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { SigninDto } from './dto/signin.dto';
// import { Request } from 'express';
import { Role } from './enum/role.enum';
import { Auth } from './decorators/auth.decotator';
import { RequestWithUser } from './interface/auth.interface';

// interface RequestWithUser extends Request {
//   user: { id: string; role: string };
// }

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('signin')
  signin(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto);
  }

  // @Get('profile')
  // @Roles(Role.USER)
  // @UseGuards(AuthGuard, RolesGuard)
  // profile(@Req() req: RequestWithUser) {
  //   return this.authService.profile(req.user);
  // }

  @Get('profile')
  @Auth([Role.ADMIN, Role.USER])
  profile(@Req() req: RequestWithUser) {
    return this.authService.profile(req.user);
  }
}
