import { User } from "@/modules/user/schema/userSchema";
import { Entity, Column, IsNull, Unique, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity('notification')
export class Notification {
    @PrimaryGeneratedColumn('uuid')
    public id!: string;

    @Column({type: 'varchar'})
    public message!: string;

   @ManyToOne(() => User, (user) => user.notification)
   @JoinColumn({ name: "user_id" })
    public user_email!: User;
}

