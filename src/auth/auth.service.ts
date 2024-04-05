import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}
  register(registerDto: RegisterDto) {
    console.log(registerDto);
    return 'register';
  }

  signin() {
    return 'sigin';
  }
}
