import { Job, Queue, Worker } from "bullmq"

export class WorkerManager {
  protected workers: Map<string, any> = new Map<string, Worker>()
  protected worker_bag = new Map<string, any>()

  public registerWorker(name: string, handler: (job: Job) => Promise<any>) {
    this.worker_bag.set(name, handler)
  }

  private addWorker(name: string, handler: (job: Job) => Promise<any>) {
    const queue = new Worker(name, handler)
    this.workers.set(name, queue)
  }

  public startWorkers() {
    this.worker_bag.forEach((handler, name) => this.addWorker(name, handler))
  }
}
