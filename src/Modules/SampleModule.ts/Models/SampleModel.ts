import { Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"

@Entity("sample_model")
export class SampleModel {
  @PrimaryGeneratedColumn("uuid")
  public id: string
}
