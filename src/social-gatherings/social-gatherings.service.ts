import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSocialGatheringDto } from './dto/create-social-gathering.dto';
import { DateTime } from 'luxon';
import { SocialGathering } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { uploadImageToS3 } from '../common/s3.service';

@Injectable()
export class SocialGatheringsService {
  constructor(private prisma: PrismaService) {}

  async create(createSocialGatheringDto: CreateSocialGatheringDto, thumbnail: Express.Multer.File) {
    // S3 업로드
    const thumnail_url = await uploadImageToS3(thumbnail.buffer, thumbnail.mimetype);
    const socialGathering = await this.prisma.socialGathering.create({
      data: {
        host_uuid: createSocialGatheringDto.host_uuid,
        name: createSocialGatheringDto.name,
        location: createSocialGatheringDto.location,
        start_datetime: createSocialGatheringDto.start_datetime,
        end_datetime: createSocialGatheringDto.end_datetime,
        thumbnail_url: thumnail_url,
        created_by: createSocialGatheringDto.created_by,
        updated_by: createSocialGatheringDto.updated_by,
        created_at: new Date(),
        updated_at: new Date()
      }
    });
    return this.formatSocialGathering(socialGathering);
  }

  async findAll() {
    const socialGatherings = await this.prisma.socialGathering.findMany();
    return socialGatherings.map(gathering => this.formatSocialGathering(gathering));
  }

  async findOne(id: number) {
    const socialGathering = await this.prisma.socialGathering.findUnique({
      where: { id }
    });
    return socialGathering ? this.formatSocialGathering(socialGathering) : null;
  }



  async findLatest(count?: number) {
    if (count == undefined || count == null || isNaN(count) || count <= 0) {
      count = 10;
    }

    const socialGatherings = await this.prisma.$queryRaw<SocialGathering[]>`
      SELECT * FROM "SocialGathering"
      ORDER BY "start_datetime" DESC
      LIMIT ${count}
    `;

    return socialGatherings.map(gathering => this.formatSocialGathering(gathering));
  }

  async findWithCursor(cursor?: number) {
    const limit = 50;
    const socialGatherings = await this.prisma.$queryRaw<SocialGathering[]>`
      SELECT * FROM "SocialGathering"
      ${cursor ? Prisma.sql`WHERE id < ${cursor}` : Prisma.empty}
      ORDER BY id DESC
      LIMIT ${limit}
    `;

    return socialGatherings.map(gathering => this.formatSocialGathering(gathering));
  }
  
  private formatSocialGathering(gathering: SocialGathering) {
    return {
      ...gathering,
      start_datetime: DateTime.fromJSDate(gathering.start_datetime)
        .setZone('Asia/Seoul')
        .toISO(),
      end_datetime: DateTime.fromJSDate(gathering.end_datetime)
        .setZone('Asia/Seoul')
        .toISO(),
      created_at: DateTime.fromJSDate(gathering.created_at)
        .setZone('Asia/Seoul')
        .toISO(),
      updated_at: DateTime.fromJSDate(gathering.updated_at)
        .setZone('Asia/Seoul')
        .toISO(),
    };
  }
} 