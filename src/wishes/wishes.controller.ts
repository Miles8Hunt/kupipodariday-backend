import { Controller, UseGuards, Get, Req, Post, Body, Param, Delete } from '@nestjs/common';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { WishesService } from './wishes.service';
import { Wish } from './entities/wish.entity';
import { CreateWishDto } from './dto/create-wish.dto';
// import { UpdateWishDto } from './dto/update-wish.dto';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @UseGuards(JwtGuard)
  @Post()
  async createWish(@Req() { user: { id } }, @Body() createWishDto: CreateWishDto): Promise<Wish> {
    return await this.wishesService.create(id, createWishDto);
  }

  @Get('last')
  async findLastWishes(): Promise<Wish[]> {
    return await this.wishesService.findLast();
  }

  @Get('top')
  async findTopWishes(): Promise<Wish[]> {
    return await this.wishesService.findTop();
  }

  // добавить перехватчик (wish)
  @UseGuards(JwtGuard)
  @Get(':id')
  async getWishById(@Req() { user: { id } }, @Param('id') wishId: number): Promise<Wish> {
    return await this.wishesService.findWishInfo(id, wishId);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async delete(@Req() { user: { id } }, @Param('id') wishId: number) {
    return await this.wishesService.remove(id, wishId);
  }

  @UseGuards(JwtGuard)
  @Post(':id/copy')
  async copyWish(@Req() { user: { id } }, @Param(':id') wishId: number) {
    return await this.wishesService.copyWish(id, wishId);
  }
}
