import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  async getDataUser() {
    return await this.service.getDataUser();
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async logInUser(@Body() body: any) {
    const { email, password } = body;
    return await this.service.logIn(email, password);
  }

  @Post('/register')
  async insertDataUser(@Body() body: any) {
    return await this.service.reGisTer(body);
  }
}
