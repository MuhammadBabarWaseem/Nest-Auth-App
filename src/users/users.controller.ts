import { JwtAuthGuard } from './../auth/jwt.guard';
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Controller, Get, Param, UseGuards, Delete } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getMyUser(@Param() params: { id: string }) {
    return this.usersService.getMyUser(params.id);
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
