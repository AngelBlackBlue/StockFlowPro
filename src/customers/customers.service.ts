import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
// import { User } from '../users/entities/user.entity';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { ActiveUserInterface } from '../common/interfaces/active-user.interface';
import { Role } from '../common/enum/role.enum';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    // @InjectRepository(User)
    // private readonly userRepository: Repository<User>,
  ) {}

  async create(
    createCustomerDto: CreateCustomerDto,
    @ActiveUser()
    user: ActiveUserInterface,
  ): Promise<Customer> {
    // const user = await this.userRepository.findOneBy({ id: userId });

    // if (!user) {
    //   throw new BadRequestException('USER_NOT_FOUND');
    // }

    return await this.customerRepository.save({
      ...createCustomerDto,
      userId: user.id,
    });
  }

  async findAll(
    @ActiveUser()
    user: ActiveUserInterface,
  ) {
    if (user.role === Role.ADMIN) {
      return await this.customerRepository.find();
    }
    return await this.customerRepository.find({ where: { userId: user.id } });
  }

  async findOne(id: string, user: ActiveUserInterface) {
    const customer = await this.customerRepository.findOneBy({ id });

    if (!customer) {
      throw new BadRequestException('CUSTOMER_NOT_FOUND');
    }

    this.validateOwnership(customer, user);

    return customer;
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return await this.customerRepository.update(id, updateCustomerDto);
  }

  async remove(id: string) {
    return await this.customerRepository.softDelete({ id });
  }

  private validateOwnership(customer: Customer, user: ActiveUserInterface) {
    if (user.role !== Role.ADMIN && customer.userId !== user.id) {
      throw new UnauthorizedException();
    }
  }
}
