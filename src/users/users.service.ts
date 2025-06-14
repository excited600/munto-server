import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { uploadImageToS3 } from '../common/s3.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto, profilePicture?: Express.Multer.File) {
    let profile_picture_url: string | null = null;
    
    if (profilePicture) {
      profile_picture_url = await uploadImageToS3(profilePicture.buffer, profilePicture.mimetype);
    }

    return this.prisma.user.create({
      data: {
        ...createUserDto,
        profile_picture_url,
      },
    });
  }
} 