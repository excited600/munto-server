import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  @UseInterceptors(FileInterceptor('profile_picture'))
  async create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() profilePicture?: Express.Multer.File,
  ) {
    return this.usersService.create(createUserDto, profilePicture);
  }
} 