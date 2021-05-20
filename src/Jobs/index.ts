import { Job, Queue, Worker } from "bullmq"

class QueueManager {
  protected queues: Map<string, any> = new Map<string, Queue>()
  protected queue_bag: string[] = []

  private addQueue(name: string) {
    const queue = new Queue(name)
    this.queues.set(name, queue)
  }

  public registerQueue(name: string) {
    this.queue_bag.push(name)
  }

  public getQueues() {
    const local_queues = []
    const it = this.queues.values()

    for (const queue of it) {
      local_queues.push(queue)
    }
    return local_queues
  }

  public startQueues() {
    this.queue_bag.forEach((name) => this.addQueue(name))
  }

  public addJob(name: string, payload: any) {
    const job = this.queues.get(name)

    if (job === undefined) {
      console.warn(`${name} was not found.`)
      return
    }

    job.add(name, payload)
  }
}

class WorkerManager {
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
