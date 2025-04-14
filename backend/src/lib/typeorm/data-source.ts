// import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../../entities/user.entity"
import { Task } from "../../entities/task.entity"

export const AppDataSource = new DataSource({
    type: "mysql",
    host:  process.env.DB_HOST ||"localhost",
    port: +(process.env.DB_PORT ||'3306'),
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "example",
    database: "todo_db",
    synchronize: true,
    logging: false,
    entities: [User, Task],
    migrations: [],
    subscribers: [],
    migrationsTableName: 'db-migrations'
})
