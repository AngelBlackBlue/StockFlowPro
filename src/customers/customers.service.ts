import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(
    userId: string,
    createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new BadRequestException('USER_NOT_FOUND');
    }

    return await this.customerRepository.save({
      ...createCustomerDto,
      user,
    });
  }

  async findAll() {
    return await this.customerRepository.find();
  }

  async findOne(id: string) {
    return await this.customerRepository.findOneBy({ id });
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return await this.customerRepository.update(id, updateCustomerDto);
  }

  async remove(id: string) {
    return await this.customerRepository.softDelete({ id });
  }
}
