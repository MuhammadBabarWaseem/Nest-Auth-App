import { PrismaService } from './../../prisma/prisma.service';
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async getMyUser(id: string) { }

    async getUsers() {
        return await this.prisma.user.findMany({
            select: { id: true, email: true },
        });
    }
}
