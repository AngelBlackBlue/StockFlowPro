import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async register(registerDto: RegisterDto) {
    const { firstname, email, password } = registerDto;

    const user = await this.userService.findOneByEmail(email);
    if (user) {
      throw new BadRequestException('user not found');
    }

    const hash = await bcrypt.hash(password, 10);

    return await this.userService.create({ firstname, email, password: hash });
  }

  signin() {
    return 'sigin';
  }
}
