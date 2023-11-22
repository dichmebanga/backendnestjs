import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    @InjectDataSource() readonly connection: DataSource,
  ) {}

  async getDataUser() {
    return await this.userRepository.find();
  }

  async logIn(email, password) {
    try {
      const user = await this.userRepository.findOneBy({ email });
      if (!user) {
        throw new ForbiddenException('Email không tồn tại');
      }
      const passwordMatched = await argon2.verify(user?.password, password);
      if (!passwordMatched) {
        throw new ForbiddenException('password không chính xác');
      }
      delete user.password;
      return await this.signJwtString(user?.id, user?.email);
    } catch (error) {
      console.error(error.message);
      throw new ForbiddenException('Đăng nhập thất bại');
    }
  }

  async reGisTer(data: any) {
    try {
      const { email, password, name, usercreate } = data;
      if (!email || !password || !name || !usercreate) {
        throw new ForbiddenException('Invalid input data');
      }
      const existingUser = await this.userRepository.findOneBy({ email });
      if (existingUser) {
        throw new ForbiddenException('Email đã tồn tại');
      }
      const hashedPassword = await argon2.hash(password);
      const userData = {
        name,
        email,
        password: hashedPassword,
        datecreate: new Date(),
        usercreate,
      };
      await this.userRepository.save(userData);
      return await this.signJwtString(existingUser?.id, existingUser?.email);
    } catch (error) {
      console.error('Registration failed:', error.message);
      throw new ForbiddenException('Cập nhập thất bại');
    }
  }

  /* Function declare token */
  async signJwtString(userId: number, email: string): Promise<any> {
    const payload = {
      sub: userId,
      email,
    };
    const signToken = await this.jwtService.signAsync(payload);
    return {
      access_token: signToken,
    };
  }
}
