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
import { serialize } from 'cookie';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  async getDataUser() {
    return await this.service.getDataUser();
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async logInUser(@Body() body, @Res() res) {
    const { email, password } = body;
    const token = await this.service.logIn(email, password);
    res.setHeader(
      'Set-Cookie',
      serialize('accessToken', token?.access_token, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      }),
    );
    return res.json({ success: true });
  }

  @Post('/register')
  async insertDataUser(@Body() body, @Res() res) {
    const token = await this.service.reGisTer(body);
    res.setHeader(
      'Set-Cookie',
      serialize('accessToken', token?.access_token, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      }),
    );
    return res.json({ success: true });
  }
}
