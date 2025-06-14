import { IsString, IsUUID } from 'class-validator';

export class ParticipateSocialGatheringDto {
  @IsUUID()
  user_uuid: string;

  @IsString()
  imp_uid: string;
} 