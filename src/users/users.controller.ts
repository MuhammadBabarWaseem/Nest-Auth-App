/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { JwtAuthGuard } from './../auth/jwt.guard';
import { Controller, Get, Param, UseGuards, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { Req } from '@nestjs/common/decorators';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getMyUser(@Param() params: { id: string }, @Req() req) {
    return this.usersService.getMyUser(params.id, req);
  }

  @Get()
  getUsers() { 
    return this.usersService.getUsers();
  } 

  @Delete(':id')
  deleteUser(@Param() params: { id: string }){
    return this.usersService.deleteUser(params.id)
  }

}
