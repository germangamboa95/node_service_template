import { Controller, Get } from "@overnightjs/core"
import { Request, Response } from "express"
import { createHelloWorldTask } from "../Modules/SampleModule.ts"

@Controller("")
export class SampleController {
  @Get("/")
  private async index(req: Request, res: Response) {
    createHelloWorldTask("This was a task")
    return res.json({ message: "Hello World" })
  }
}
