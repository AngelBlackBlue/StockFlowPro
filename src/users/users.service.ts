import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, //se tiene que comportar como un repositorio que contiene la entidad
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }

  async findOneByUserWithPassword(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      select: ['id', 'firstname', 'email', 'password', 'role'],
    });
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    return await this.userRepository.findOneBy({ id });
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    image: Express.Multer.File,
  ) {
     
    if(image){
      const user = await this.userRepository.findOneBy({ id });
      user.publicId && await this.cloudinaryService.deleteImage(user.publicId)  

      const data = await this.cloudinaryService.uploadImage(image);
      updateUserDto.imageUrl = data.secure_url
      updateUserDto.publicId = data.public_id
    }

    await this.userRepository.update(id, updateUserDto);

    return await this.userRepository.findOne({
      where: { id },
      select: ['id', 'lastname', 'phone', 'company', 'imageUrl', 'cbu', 'alias', 'cuit'],
    });

  }

  async remove(id: string) {
    return await this.userRepository.softDelete({ id }); 
  }

  

}
