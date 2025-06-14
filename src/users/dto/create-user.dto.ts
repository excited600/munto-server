import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  introduction?: string;
  
  @IsString()
  is_host: string;

} 