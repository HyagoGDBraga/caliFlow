import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Role } from "@/helpers/role.helper";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  public id!: string;

  @Column({
    type: "varchar",
    length: 100,
    unique: true,
  })
  public email!: string;

  @Column({ type: "varchar", length: 100 })
  public name!: string;

  @Column({
    type: "text",
    length: 100,
    unique: true,
  })
  public bio?: string;

  @Column({ type: "varchar", length: 100 })
  public password!: string;

  @Column({ type: "enum", default: Role.USER })
  public role!: Role;

  @Column({ type: "array" })
  public friends?: User[];
}
