import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Url } from './url.entity';
import { UrlShortnerController } from './url_shortner.controller';
import { UrlShortnerService } from './url_shortner.service';

@Module({
  imports: [TypeOrmModule.forFeature([Url])],
  controllers: [UrlShortnerController],
  providers: [UrlShortnerService],
})
export class UrlShortnerModule {}
