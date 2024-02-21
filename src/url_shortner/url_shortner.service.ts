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

  async getOneById(id: number): Promise<Url> {
    try {
      return await this.urlRepository.findOneOrFail({
        where: { id: id },
      });
    } catch (err) {
      console.log('Get one Url by id error: ', err.message ?? err);
      throw new HttpException(
        `Url with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async create(Url: CreateURLDto): Promise<Url> {
    const createdUrl = this.urlRepository.create(Url);
    return await this.urlRepository.save(createdUrl);
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
