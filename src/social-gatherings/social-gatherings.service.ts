import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSocialGatheringDto } from './dto/create-social-gathering.dto';
import { DateTime } from 'luxon';
import { SocialGathering } from '@prisma/client';
import { Prisma } from '@prisma/client';

@Injectable()
export class SocialGatheringsService {
  constructor(private prisma: PrismaService) {}

  async create(createSocialGatheringDto: CreateSocialGatheringDto) {
    const socialGathering = await this.prisma.socialGathering.create({
      data: {
        host_uuid: createSocialGatheringDto.host_uuid,
        name: createSocialGatheringDto.name,
        location: createSocialGatheringDto.location,
        start_datetime: createSocialGatheringDto.start_datetime,
        end_datetime: createSocialGatheringDto.end_datetime
      }
    });

    return {
      ...socialGathering,
      start_datetime: DateTime.fromJSDate(socialGathering.start_datetime)
        .setZone('Asia/Seoul')
        .toISO(),
      end_datetime: DateTime.fromJSDate(socialGathering.end_datetime)
        .setZone('Asia/Seoul')
        .toISO(),
    };

  }

  async findAll() {
    return this.prisma.$queryRaw`
      SELECT * FROM "SocialGathering"
    `;
  }

  async findOne(id: number) {
    return this.prisma.$queryRaw`
      SELECT * FROM "SocialGathering"
      WHERE id = ${id}
    `;
  }

  async update(id: number, updateSocialGatheringDto: Partial<CreateSocialGatheringDto>) {
    const fields = Object.keys(updateSocialGatheringDto)
      .map(key => `${key} = $${key}`)
      .join(', ');
    
    return this.prisma.$queryRaw`
      UPDATE "SocialGathering"
      SET ${fields}
      WHERE id = ${id}
      RETURNING *
    `;
  }

  async remove(id: number) {
    return this.prisma.$queryRaw`
      DELETE FROM "SocialGathering"
      WHERE id = ${id}
      RETURNING *
    `;
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

    return socialGatherings.map(gathering => ({
      ...gathering,
      start_datetime: DateTime.fromJSDate(gathering.start_datetime)
        .setZone('Asia/Seoul')
        .toISO(),
      end_datetime: DateTime.fromJSDate(gathering.end_datetime)
        .setZone('Asia/Seoul')
        .toISO(),
    }));
  }

  async findWithCursor(cursor?: number) {
    const limit = 50;
    const socialGatherings = await this.prisma.$queryRaw`
      SELECT * FROM "SocialGathering"
      ${cursor ? Prisma.sql`WHERE id < ${cursor}` : Prisma.empty}
      ORDER BY id DESC
      LIMIT ${limit}
    `;

    return (socialGatherings as any[]).map(gathering => ({
      ...gathering,
      start_datetime: DateTime.fromJSDate(gathering.start_datetime)
        .setZone('Asia/Seoul')
        .toISO(),
      end_datetime: DateTime.fromJSDate(gathering.end_datetime)
        .setZone('Asia/Seoul')
        .toISO(),
    }));
  }
} 