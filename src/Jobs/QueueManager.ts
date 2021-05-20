import { Queue } from "bullmq"

export class QueueManager {
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
