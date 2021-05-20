import "reflect-metadata"
import { createConnection } from "typeorm"
import { queue_manager, worker_manager } from "./Jobs"
import { loadModels } from "./registerModels"
import { HttpServer } from "./server"

interface ApplicationOptions {
  http_server?: boolean
  queue_workers?: boolean
  queues?: boolean
}

const defaultApplicationOpts: ApplicationOptions = {
  http_server: true,
  queue_workers: true,
  queues: true,
}

export const start = async (opts = defaultApplicationOpts) => {
  opts = {
    ...defaultApplicationOpts,
    ...opts,
  }

  const connection = await createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "test",
    password: "test",
    database: "test",
    logging: false,
    entities: loadModels,
  })

  if (opts.http_server) {
    new HttpServer().start(3000)
  }
  if (opts.queue_workers) {
    worker_manager.startWorkers()
  }
  if (opts.queues) {
    queue_manager.startQueues()
  }
}
