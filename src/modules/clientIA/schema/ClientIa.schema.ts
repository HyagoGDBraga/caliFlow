import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "@/modules/user/schema/userSchema";
import { MessageRole } from "@/helpers";
@Entity("ClientIA")
export class ClientIA {
  @PrimaryGeneratedColumn("uuid")
  public id!: string;

  @Column({ type: "text" })
  public message!: string;

  @CreateDateColumn()
  public createdAt!: Date;

  @Column({type: 'enum', enum: MessageRole})
  public message_type!: MessageRole;

  @ManyToOne(() => User, (user) => user.clientIA_messages, {
    onDelete: "CASCADE",
  })
  public user!: User;
}