import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name' })
  ten: string;

  @Column({ name: 'create_at' })
  ngaytao: Date;

  @Column({ name: 'create_by' })
  nguoitao: number;

  @Column({ name: 'email' })
  email: string;
}
