import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from "typeorm";
import { Role } from "@/helpers/role.helper";
import { Notification } from "@/modules/notification/schema/Notification.schema";
import { Party } from "@/modules/party/schema/Party.schema";
import { ClientIA } from "@/modules/clientIA/schema/ClientIa.schema";
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

  @Column({
    type: "varchar",
    length: 100,
  })
  public name!: string;

  @Column({
    type: "text",
    nullable: true,
  })
  public bio?: string;

  @Column({
    type: "varchar",
    length: 100,
  })
  public password!: string;

  @Column({
    type: "enum",
    enum: Role,
    default: Role.USER,
  })
  public role!: Role;

  @ManyToMany(() => User)
  @JoinTable()
  public friends?: User[];

  @Column({
    type: "varchar",
    length: 100,
  })
  public photo!: string;

  @OneToMany(() => Notification, (notification) => notification.user_email)
  public notification?: Notification[];

  @ManyToMany(() => Party, (party) => party.users)
  public parties?: Party[];

  @OneToMany(() => ClientIA, (clientIa) => clientIa.user)
  public clientIA_messages!: ClientIA[];
}
