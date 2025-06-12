import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSocialGatheringDto } from './dto/create-social-gathering.dto';
import { DateTime } from 'luxon';

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
} 