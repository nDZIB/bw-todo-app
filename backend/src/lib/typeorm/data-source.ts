// import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../../entities/user.entity"
import { Task } from "../../entities/task.entity"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "example",
    database: "todo_db",
    synchronize: true,
    logging: false,
    entities: [User, Task],
    migrations: [],
    subscribers: [],
    migrationsTableName: 'db-migrations'
})
