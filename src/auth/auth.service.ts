import { PrismaService } from './../../prisma/prisma.service';
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Injectable, BadRequestException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

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
            throw new BadRequestException('Wrong Credentials');
        }

        const isMatch = await this.comparePassword({ password, hash: foundUser.hashedPassword });
        if (!isMatch) {
            throw new BadRequestException('Wrong Credentials');
        }

        return { message: 'Signin Successful' };
    }

    async signout() {
        return { message: 'Signout Successful' };
    }

    async hashPassword(pasword: string) {
        const saltOrRounds = 10;
        const password = 'random_password';
        return await bcrypt.hash(password, saltOrRounds);
    }

    async comparePassword(args: { password: string, hash: string }) {

        return await bcrypt.compare(args.password, args.hash);

    }
}
