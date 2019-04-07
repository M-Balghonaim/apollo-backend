import {
  Entity,
  Column,
  BaseEntity,
  ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import {User} from './User';
import {MediaListMedia} from './MediaListMedia';

@Entity()
export class MediaList extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') public id: string;

  @Column('varchar', {length: 50})
  public title: string;

  @ManyToOne((type) => User, (user) => user.mediaLists)
  public owner: User;

  @OneToMany((type) => MediaListMedia, (media) => media.list, {eager: true})
  public mediaListItems: MediaListMedia[];
}