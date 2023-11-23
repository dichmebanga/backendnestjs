import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'create_at' })
  datecreate: Date;

  @Column({ name: 'create_by' })
  usercreate: number;

  @Column({ name: 'email' })
  email: string;
  
  @Column({ name: 'password' })
  password: string;
}
