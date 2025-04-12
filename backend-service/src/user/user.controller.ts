import { Controller, Get, Param } from '@nestjs/common';

@Controller('users')
export class UserController {
  @Get(':id')
  getUsers(@Param('id') param: string): string {
    return `These are the params: ${param}`;
  }
}
