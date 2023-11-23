import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'crawls' })
export class CrawlsEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'price' })
  price: string;

  @Column({ name: 'img' })
  img: string;

  @Column({ name: 'group' })
  group: string;
}
