import { JwtStrategy } from './../auth/jwt.strategy';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
})
export class UsersModule {}
