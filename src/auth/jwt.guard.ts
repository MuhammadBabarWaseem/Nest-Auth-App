/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport/dist";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    
}
