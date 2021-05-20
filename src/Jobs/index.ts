import { Job } from "bullmq"
import { QueueManager } from "./QueueManager"
import { WorkerManager } from "./WorkerManager"

export const queue_manager = new QueueManager()

export const worker_manager = new WorkerManager()

export const register_task = (
  name: string,
  handler: (job: Job) => Promise<any>
) => {
  queue_manager.registerQueue(name)
  worker_manager.registerWorker(name, handler)

  return (payload: any) => queue_manager.addJob(name, payload)
}
