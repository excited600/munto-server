import { IsString, IsUUID, IsDateString, IsInt, Min } from 'class-validator';

export class CreateSocialGatheringDto {
  @IsUUID()
  host_uuid: string;

  @IsString()
  name: string;

  @IsString()
  location: string;

  @IsInt()
  @Min(0)
  price: number;

  @IsDateString()
  start_datetime: Date;

  @IsDateString()
  end_datetime: Date;

  @IsUUID()
  created_by: string;

  @IsUUID()
  updated_by: string;
} 