import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Auth } from 'src/auth/decorators/auth.decotator';
import { Role } from 'src/common/enum/role.enum';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { ActiveUserInterface } from '../common/interfaces/active-user.interface';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Customers')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: 'Unauthorized Bearer Auth',
})
@Auth([Role.USER])
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  create(
    @Body() createCustomerDto: CreateCustomerDto,
    @ActiveUser() user: ActiveUserInterface,
  ) {
    return this.customersService.create(createCustomerDto, user);
  }

  @Get()
  findAll(@ActiveUser() user: ActiveUserInterface) {
    return this.customersService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @ActiveUser() user: ActiveUserInterface) {
    return this.customersService.findOne(id, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
    @ActiveUser() user: ActiveUserInterface,
  ) {
    return this.customersService.update(id, updateCustomerDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, user: ActiveUserInterface) {
    return this.customersService.remove(id, user);
  }
}
