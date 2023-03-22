/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { jwtSecret } from './../utils/constant';
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport/dist";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                JwtStrategy.extractJwt,
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ]),
            secretOrKey: jwtSecret
        })
    }

    private static extractJwt(req: Request): string | null {
        if (req.cookies && 'token' in req.cookies) {
            return req.cookies.token
        }
        return null;
    }

    async validate(payload: { id: string, email: string }) { 
        return payload;
    }

}