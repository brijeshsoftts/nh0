import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { UserDetails } from './users.types';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(userId: string): Promise<UserDetails> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        role: true,
        profile: {
          select: {
            id: true,
            url: true,
            altText: true,
          },
        },
        staff: {
          select: {
            category: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      ...(user.staff?.category && {
        category: user.staff.category,
      }),
      profile: user.profile,
    };
  }
}
