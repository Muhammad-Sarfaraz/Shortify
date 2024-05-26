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
  @IsString({ message: 'long url must be a text' })
  @ApiProperty()
  long_url: string;
}
