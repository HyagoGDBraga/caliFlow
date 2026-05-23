import "reflect-metadata"
import { DataSource } from "typeorm"
import { envalid } from "@/env/envalid"
import { User } from "@/modules/user/schema/userSchema";
import { Notification } from "@/modules/notification/schema/Notification.schema";
import { Party } from "@/modules/party/schema/Party.schema";

const dataSource = new DataSource({
    type: "postgres",
    username: envalid.DB_USER,
    database: envalid.DB_NAME,
    host: envalid.DB_HOST,
    password: envalid.DB_PASSWORD,

    entities: [User, Notification, Party],
    migrations: ["src/infra/database/migrations/*.ts"],

  synchronize: false,
  logging: false,
})

export default dataSource;