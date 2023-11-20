// users.service.ts

import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectDataSource() readonly connection: DataSource,
  ) {}

  async getDataUser(){
    return await this.userRepository.find()
  }

  async insertUser(user: UserEntity): Promise<UserEntity> {
    // Bạn có thể sử dụng userRepository để thực hiện lệnh insert
    const insertedUser = await this.userRepository.save(user);

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // Thực hiện các thao tác khác ở đây nếu cần
      await queryRunner.commitTransaction();
    } catch (err) {
      // Rollback nếu có lỗi
      await queryRunner.rollbackTransaction();
    } finally {
      // Đảm bảo kết thúc transaction và release query runner
      await queryRunner.release();
    }

    return insertedUser;
  }
}
