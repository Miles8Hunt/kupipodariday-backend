import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HashService } from 'src/hash/hash.service';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly hashService: HashService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const userWithHash = await this.hashService.getUserWithHash<CreateUserDto>(createUserDto);
      return await this.usersRepository.save(userWithHash);
    } catch (err) {
      if (err instanceof QueryFailedError) {
      //  выбросить ошибку
      }
    }
  }

  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
    //  выбросить ошибку
    }
    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ username });
    if (!user) {
    //  выбросить ошибку
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ email });
    if (!user) {
    //  выбросить ошибку
    }
    return user;
  }

  async findByQuery(query: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const user = emailRegex.test(query)
      ? await this.findByEmail(query)
      : await this.findByUsername(query);

    if (!user) {
    //  выбросить ошибку
    }
    return [user];
  }

  async findWishes(id: number, relations: string[]) {
    const { wishes } = await this.usersRepository.findOne({ where: { id }, relations });

    if (!wishes) {
    //  выбросить ошибку
    }
    return wishes;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const newUserData = updateUserDto.hasOwnProperty('password')
      ? await this.hashService.getUserWithHash<UpdateUserDto>(updateUserDto)
      : updateUserDto;

    const user = await this.usersRepository.update(id, newUserData);
    
    if (user.affected === 0) {
    //  выбросить ошибку
    }
    return this.findById(id);
  }
  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
