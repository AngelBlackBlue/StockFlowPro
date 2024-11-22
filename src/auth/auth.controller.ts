import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { SigninDto } from './dto/signin.dto';
import { Role } from '../common/enum/role.enum';
import { Auth } from './decorators/auth.decotator';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { ActiveUserInterface } from 'src/common/interfaces/active-user.interface';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Successful' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  signin(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Successful',
    schema: {
      example: {
        id: 'string',
        firstname: 'string',
        lastname: 'string',
        email: 'string',
        password: 'string',
        phone: 'string',
        company: 'string',
        image: 'string',
        cbu: 'string',
        alias: 'string',
        cuit: 'string',
        validator: 0,
        status: 'string',
        role: 'string',
        createdDate: '2024-06-06T15:40:35.181Z',
        updatedDate: '2024-06-06T15:40:35.181Z',
        deletedAt: '2024-06-06T15:40:35.181Z',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized Bearer Auth',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Get('profile')
  @Auth([Role.USER, Role.ADMIN])
  profile(@ActiveUser() user: ActiveUserInterface) {
    return this.authService.profile(user);
  }
}
