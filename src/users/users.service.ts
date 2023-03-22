import { NotFoundException, ForbiddenException } from '@nestjs/common';
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { PrismaService } from './../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async getMyUser(id: string, req: Request) { 
        const user = await this.prisma.user.findUnique({where: {id}})

        if(!user){
            throw new NotFoundException()
        }

        const decodedUser = req.user as {id:string, email:string}

        if(user.id !== decodedUser.id){
            throw new ForbiddenException()
        }

        delete user.hashedPassword;

        return {user}
    }

    async getUsers() {
        return await this.prisma.user.findMany({
            select: { id: true, email: true },
        });
    }

    async deleteUser(id:string){
        return this.prisma.user.delete({where: {id}})
   }


}
