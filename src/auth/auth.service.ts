import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { SigninDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { firstname, email, password } = registerDto;

    const user = await this.userService.findOneByEmail(email);
    if (user) {
      throw new BadRequestException('user is already registered');
    }

    const hash = await bcrypt.hash(password, 10);

    return await this.userService.create({ firstname, email, password: hash });
  }

  async signin(signinDto: SigninDto) {
    const { email, password } = signinDto;

    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('user not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Incorrect password');
    }

    const payload = { sub: user.id };

    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      email,
    };

    return 'sigin';
  }
}
