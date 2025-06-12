import { IsString, IsUUID, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSocialGatheringDto {
  @IsUUID()
  host_uuid: string;

  @IsString()
  name: string;

  @IsString()
  location: string;

  @IsDateString()
  start_datetime: Date;

  @IsDateString()
  end_datetime: Date;
} 