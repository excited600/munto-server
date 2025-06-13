import { Controller, Get, Post, Body, Param, Query, ParseIntPipe, BadRequestException, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SocialGatheringsService } from './social-gatherings.service';
import { CreateSocialGatheringDto } from './dto/create-social-gathering.dto';

@Controller('social-gatherings')
export class SocialGatheringsController {
  constructor(private readonly socialGatheringsService: SocialGatheringsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('thumbnail'))
  async create(
    @Body() createSocialGatheringDto: CreateSocialGatheringDto,
    @UploadedFile() thumbnail: Express.Multer.File,
  ) {
    // created_by와 updated_by는 현재 로그인한 사용자의 UUID로 설정
    createSocialGatheringDto.created_by = createSocialGatheringDto.host_uuid;
    createSocialGatheringDto.updated_by = createSocialGatheringDto.host_uuid;
    return this.socialGatheringsService.create(createSocialGatheringDto, thumbnail);
  }

  @Get()
  findAll() {
    return this.socialGatheringsService.findAll();
  }

  @Get('latest')
  findLatest(@Query('count') count?: string) {
    const countNumber = count ? parseInt(count, 10) : undefined;
    return this.socialGatheringsService.findLatest(countNumber);
  }

  @Get('scroll')
  findWithCursor(@Query('cursor') cursor?: string) {
    const cursorNumber = cursor ? parseInt(cursor, 10) : undefined;
    return this.socialGatheringsService.findWithCursor(cursorNumber);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.socialGatheringsService.findOne(id);
  }

}