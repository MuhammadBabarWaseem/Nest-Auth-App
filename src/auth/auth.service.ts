/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { PrismaService } from './../../prisma/prisma.service';
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from 'src/utils/constant';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService) { }

    async signup(dto: AuthDto) {
        const { email, password } = dto;

        const foundUser = await this.prisma.user.findUnique({ where: { email } });

        if (foundUser) {
            throw new BadRequestException('Email Already Exist');
        }

        const hashedPassword = await this.hashPassword(password);
        await this.prisma.user.create({
            data: {
                email,
                hashedPassword,
            },
        });

        return { message: 'Signup Successful' };
    }

    async signin(dto: AuthDto) {
        const { email, password } = dto;

        const foundUser = await this.prisma.user.findUnique({ where: { email } });

        if (!foundUser) {
            throw new NotFoundException('Wrong Credentials')
        }

        const isMatch = await this.comparePassword({
            password,
            hash: foundUser.hashedPassword,
        });

        if (!isMatch) {
            throw new BadRequestException('Wrong Credentials');
        }

        const token = await this.signToken({
            id: foundUser.id,
            email: foundUser.email,
        });

        return { token };
    }


    async signout() {
        return { message: 'Signout Successful' };
    }

    async hashPassword(pasword: string) {
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(pasword, saltOrRounds);
        return hashedPassword;
    }

    async comparePassword(args: { password: string; hash: string }) {
        return await bcrypt.compare(args.password, args.hash);
    }

    async signToken(args: { id: string; email: string }) {
        const payload = args;
        return this.jwt.signAsync(payload, { secret: jwtSecret });
    }
}
