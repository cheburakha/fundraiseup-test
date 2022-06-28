import {
  ArrayNotEmpty,
  IsArray,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { ITrack } from '@app/shared/track.interface';

export class TrackDto implements ITrack {
  @IsString({ message: 'Field must be a string' })
  event: string;

  @IsOptional()
  @IsArray({ message: 'Field must be an array' })
  @IsString({ message: 'Field must be a string', each: true })
  tags: string[] = [];

  @IsString({ message: 'Field must be a string' })
  title: string;

  @IsString({ message: 'Field must be a string' })
  url: string;

  @IsString({ message: 'Field must be a string' })
  ts: string;
}

export class TracksCreateDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => TrackDto)
  tracks: TrackDto[];
}
