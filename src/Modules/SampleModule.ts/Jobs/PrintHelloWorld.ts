import { Job } from "bullmq"
import { register_task } from "../../../Jobs"

const PRINT_HELLO_WORLD = "print_hello_world"

const printHelloWorld = async (job: Job) => {
  console.log(job.data)
}

export const createHelloWorldTask = register_task(
  PRINT_HELLO_WORLD,
  printHelloWorld
)
