import { Controller, UseGuards, Get, Req, Post, Body, Patch, Param, UseFilters } from '@nestjs/common';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Wish } from '../wishes/entities/wish.entity';
import { UserWishesDto } from './dto/user-wishes.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InvalidDataExceptionFilter } from '../filter/invalid-data-exception.filter';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

//  добавить перехватчик (user)
  @Get('me')
  async findCurrentUser(@Req() { user: { id } }): Promise<User> {
    return await this.usersService.findById(id);
  }

//  добавить перехватчик (wish)
  @Get('me/wishes')
  async findCurrentUserWishes(@Req() { user: { id } }): Promise<Wish[]> {
    const relations = ['wishes', 'wishes.owner', 'wishes.offers'];
    return await this.usersService.findWishes(id, relations);
  }

//  добавить перехватчик (user)
  @Post('find')
  async findUserByQuery(@Body('query') query: string): Promise<User[]> {
    return await this.usersService.findByQuery(query);
  }

//  добавить перехватчик (user)
  @Get(':username')
  async findUserData(@Param('username') username: string): Promise<User> {
    return await this.usersService.findByUsername(username);
  }

//  добавить перехватчик (wish)
  @Get(':username/wishes')
  async findUserWishes(@Param('username') username: string): Promise<UserWishesDto[]> {
    const { id } = await this.usersService.findByUsername(username);
    const relations = ['wishes', 'wishes.owner', 'wishes.offers'];
    return await this.usersService.findWishes(id, relations);
  }

//  добавить перехватчик (user)
  @Patch('me')
  @UseFilters(InvalidDataExceptionFilter)
  async updateCurrentUser(@Req() { user: { id } }, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return await this.usersService.updateUser(id, updateUserDto);
  }
}
