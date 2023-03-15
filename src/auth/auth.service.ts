/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor() {}

    async signup(){
        return {message : 'Signup Successful'}
        }
    async signin() {
        return {message : 'Signin Successful'}
    }
    async signout() {
        return {message : 'Signout Successful'}
    }
    
}
