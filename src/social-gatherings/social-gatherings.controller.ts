import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { SocialGatheringsService } from './social-gatherings.service';
import { CreateSocialGatheringDto } from './dto/create-social-gathering.dto';
import { HostGuard } from './guards/host.guard';

@Controller('social-gatherings')
export class SocialGatheringsController {
  constructor(private readonly socialGatheringsService: SocialGatheringsService) {}

  @Post()
  create(@Body() createSocialGatheringDto: CreateSocialGatheringDto) {
    return this.socialGatheringsService.create(createSocialGatheringDto);
  }

  @Get()
  findAll() {
    return this.socialGatheringsService.findAll();
  }

  @Get('latest')
  findLatest(@Query('count') count?: string) {
    var countNumber = count ? parseInt(count, 10) : 10;
    if (isNaN(countNumber)) {
      countNumber = 10;
    }
    return this.socialGatheringsService.findLatest(countNumber);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.socialGatheringsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(HostGuard)
  update(
    @Param('id') id: string,
    @Body() updateSocialGatheringDto: Partial<CreateSocialGatheringDto>,
  ) {
    return this.socialGatheringsService.update(+id, updateSocialGatheringDto);
  }

  @Delete(':id')
  @UseGuards(HostGuard)
  remove(@Param('id') id: string) {
  }
}