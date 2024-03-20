import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    return await this.customerRepository.save(createCustomerDto);
    // return 'This action adds a new customer';
  }

  async findAll() {
    // return `This action returns all customers`;
    return await this.customerRepository.find();
  }

  async findOne(id: string) {
    return await this.customerRepository.findOneBy({ id });
    // return `This action returns a #${id} customer`;
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    // return `This action updates a #${id} customer`;
    return await this.customerRepository.update(id, updateCustomerDto);
  }

  async remove(id: string) {
    // return `This action removes a #${id} customer`;
    return await this.customerRepository.softDelete({ id });
  }
}
