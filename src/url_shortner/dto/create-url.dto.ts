import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateURLDto {
  @IsNotEmpty()
  @IsString({ message: 'short url must be a text' })
  @ApiProperty()
  short_url: string;

  @IsString({ message: 'long url must be a text' })
  @ApiProperty()
  long_url: string;

  @IsString({ message: 'description must be a text' })
  @ApiProperty()
  description: string;
}
