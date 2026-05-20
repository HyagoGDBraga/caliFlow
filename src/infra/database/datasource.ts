import "reflect-metadata"
import { DataSource } from "typeorm"
//import { User } from "./entities/User"
import { envalid } from "@/env/envalid"

const dataSource = new DataSource({
    type: "postgres",
    username: envalid.DB_USER,
    database: envalid.DB_NAME,
    host: envalid.DB_HOST,
    password: envalid.DB_PASSWORD,

    entities: [],
    migrations: ["src/infra/database/migrations/*.ts"],

  synchronize: false,
  logging: false,
})

export default dataSource;