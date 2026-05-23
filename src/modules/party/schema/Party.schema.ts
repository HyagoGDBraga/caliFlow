import { User } from "@/modules/user/schema/userSchema";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
} from "typeorm";
@Entity("party")
export class Party {
  @PrimaryGeneratedColumn("uuid")
  public id!: string;

  @Column({
    type: "varchar",
    length: 100,
  })
  public name!: string;

  @Column({
    type: "text",
    nullable: true,
  })
  public description?: string;

  @Column({
    type: "int",
    default: 10,
  })
  public maxMembers!: number;

  @Column({
    type: "boolean",
    default: true,
  })
  public isOpen!: boolean;

  @CreateDateColumn()
  public createdAt!: Date;

  @ManyToMany(() => User, (user) => user.parties)
  @JoinTable()
  public users!: User[];
}
