import { createConnection } from "typeorm"
import { loadModels } from "./registerModels"

export const connection = createConnection({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "test",
  password: "test",
  database: "test",
  logging: false,
  entities: loadModels,
})
