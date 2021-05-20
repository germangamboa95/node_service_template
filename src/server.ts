import { Server } from "@overnightjs/core"
import express from "express"
import { controllers } from "./HttpControllers"

export class HttpServer extends Server {
  constructor() {
    super()
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.setupControllers()
  }

  private setupControllers(): void {
    const controllerInstances = controllers.map((C: any) => new C())
    super.addControllers(controllerInstances)
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      console.log("booted")
    })
  }
}
