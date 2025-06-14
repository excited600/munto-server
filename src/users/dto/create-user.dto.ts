import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsNumber()
  temperature: number;

  @IsOptional()
  @IsString()
  introduction?: string;
  
  @IsBoolean()
  is_host: boolean;

  @IsOptional()
  @IsBoolean()
  is_authenticated?: boolean;
} 