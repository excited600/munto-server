import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { DateTime } from 'luxon';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('/signup')
  @UseInterceptors(FileInterceptor('profile_picture'))
  async create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() profilePicture?: Express.Multer.File,
  ) {
    return this.usersService.create(createUserDto, profilePicture);
  }

  @Post('login')
  async login(@Body() loginDto: { uuid: string }) {
    const user = await this.usersService.findOne(loginDto.uuid);
    return this.authService.generateToken(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.usersService.findOne(uuid);
  }
} 