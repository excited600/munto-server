import { IsString, IsUUID } from 'class-validator';

export class ParticipateSocialGatheringDto {
  @IsString()
  user_uuid: string;

  @IsString()
  imp_uid: string;
} 