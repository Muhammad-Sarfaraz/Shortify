import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateURLDto, UpdateUrlDto } from './dto/index';
import { Url } from './url.entity';

@Injectable()
export class UrlShortnerService {
  constructor(
    @InjectRepository(Url) private urlRepository: Repository<Url>,
  ) {}

  async getAll(): Promise<Url[]> {
    return await this.urlRepository.find();
  }

  async getOneByShortUrl(short_url: string): Promise<Url> {
    try {
      return await this.urlRepository.findOneOrFail({
        where: { short_url: short_url },
      });
    } catch (err) {
      console.log('Get one Url by short_url error: ', err.message ?? err);
      throw new HttpException(
        `Url with  ${short_url} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
  
  async create(data: CreateURLDto): Promise<Url> {
    const shortUrl = await this.generateShortUrl(); // Generate short URL
    const createdUrl = this.urlRepository.create({
      long_url: data.long_url,
      short_url: shortUrl,
    });
    return await this.urlRepository.save(createdUrl);
  }

  generateShortUrl() {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomCode = '';
    for (let i = 0; i < 6; i++) {
      randomCode += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return randomCode;
  }

  async update(id: number, Url: UpdateUrlDto): Promise<Url> {
    let foundUrl = await this.urlRepository.findOneBy({
      id: id,
    });

    if (!foundUrl) {
      throw new HttpException(
        `Url with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }

    foundUrl = { ...foundUrl, ...Url, updated_at: new Date() };
    return await this.urlRepository.save(foundUrl);
  }

  async delete(id: number): Promise<number> {
    let foundUrl = await this.urlRepository.findOneBy({
      id: id,
    });

    if (!foundUrl) {
      throw new HttpException(
        `Url with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.urlRepository.delete(id);
    return foundUrl.id;
  }
}
