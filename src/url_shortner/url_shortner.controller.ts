import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  Patch,
} from '@nestjs/common';
import { CreateURLDto, UpdateUrlDto } from './dto/index';
import { Url } from './url.entity';
import { UrlShortnerService } from './url_shortner.service';

@Controller('url_shortner')
export class UrlShortnerController {
  constructor(private UrlShortnerService: UrlShortnerService) {}

  @Get()
  async GetAll(): Promise<Url[]> {
    return this.UrlShortnerService.getAll();
  }

  @Get(':short_url')
  async GetOne(@Param('short_url') short_url: string): Promise<Url> {
    return this.UrlShortnerService.getOneByShortUrl(short_url);
  }

  @Post()
  async create(@Body() Url: CreateURLDto): Promise<Url> {
    return this.UrlShortnerService.create(Url);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() Url: UpdateUrlDto,
  ): Promise<Url> {
    return this.UrlShortnerService.update(id, Url);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return this.UrlShortnerService.delete(id);
  }
}
