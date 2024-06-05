import { Controller, Post, Body, UseGuards, Req, UseFilters, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
import { LocalGuard } from './guard/local.guard';
import { InvalidDataExceptionFilter } from 'src/filter/invalid-data-exception.filter';
import { UserInterceptor } from '../interceptors/user.interceptor';

@UseFilters(InvalidDataExceptionFilter)
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('signin')
  @UseGuards(LocalGuard)
  async signin(@Req() req: Request & { user: User }) {
    return this.authService.auth(req.user);
  }

  @UseInterceptors(UserInterceptor)
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return await this.authService.auth(user);
  }
}
