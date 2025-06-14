import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { uploadImageToS3 } from '../common/s3.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto, profilePicture?: Express.Multer.File) {
    let profile_picture_url: string | null = null;
    const { name, introduction } = createUserDto;
    
    if (profilePicture) {
      profile_picture_url = await uploadImageToS3(profilePicture.buffer, profilePicture.mimetype, 'users');
    }

    const isHost = createUserDto.is_host === 'true'
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    return this.prisma.user.create({
      data: {
        name,
        introduction,
        is_host: isHost,
        profile_picture_url,
        password: hashedPassword,
        created_at: new Date(),
        updated_at: new Date()

      },
    });
  }

  async findOne(uuid: string) {
    const user = await this.prisma.user.findUnique({
      where: { uuid },
    });

    if (!user) {
      throw new NotFoundException(`User with UUID ${uuid} not found`);
    }

    return user;
  }
} 