import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new ForbiddenException('Email không tồn tại');
    }
    const passwordMatched = await argon2.verify(user?.password, password);
    if (!passwordMatched) {
      throw new ForbiddenException('password không chính xác');
    }
    delete user.password;
    return user;
  }

  async reGisTer(data: any): Promise<string> {
    try {
      const { email, password, name, usercreate } = data;
      // Type checking for required parameters
      if (!email || !password || !name || !usercreate) {
        throw new ForbiddenException('Invalid input data');
      }
      // Check if email already exists
      const existingUser = await this.userRepository.findOneBy({ email });
      if (existingUser) {
        throw new ForbiddenException( 'Email đã tồn tại');
      }
      // Hash the password
      const hashedPassword = await argon2.hash(password);
      // Save the user data
      const userData = {
        name,
        email,
        password: hashedPassword,
        datecreate: new Date(),
        usercreate,
      };
      await this.userRepository.save(userData);
      return 'Cập nhập thành công';
    } catch (error) {
      console.error('Registration failed:', error.message);
      throw new ForbiddenException('Cập nhập thất bại');
    }
  }
}
