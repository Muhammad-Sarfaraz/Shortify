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

  @Get(':id')
  async GetOne(@Param('id', ParseIntPipe) id: number): Promise<Url> {
    return this.UrlShortnerService.getOneById(id);
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
