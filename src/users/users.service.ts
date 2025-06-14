import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { uploadImageToS3 } from '../common/s3.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto, profilePicture?: Express.Multer.File) {
    let profile_picture_url: string | null = null;
    
    if (profilePicture) {
      profile_picture_url = await uploadImageToS3(profilePicture.buffer, profilePicture.mimetype, 'users');
    }

    const isHost = createUserDto.is_host === 'true'
    const isAuthenticated = false;
    const temperature = 36.5;

    return this.prisma.user.create({
      data: {
        name: createUserDto.name,
        temperature: temperature,
        introduction: createUserDto.introduction,
        is_host: isHost,
        is_authenticated: isAuthenticated,
        profile_picture_url,
        created_at: new Date(),
        updated_at: new Date()
      }
    });
  }
} 