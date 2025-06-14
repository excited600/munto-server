import { IsString, IsUUID, IsDateString } from 'class-validator';

export class CreateSocialGatheringDto {
  @IsUUID()
  host_uuid: string;

  @IsString()
  name: string;

  @IsString()
  location: string;

  @IsString()
  price: string;

  @IsDateString()
  start_datetime: Date;

  @IsDateString()
  end_datetime: Date;

  @IsUUID()
  created_by: string;

  @IsUUID()
  updated_by: string;
} 