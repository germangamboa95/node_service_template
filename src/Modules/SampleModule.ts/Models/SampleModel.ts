import { BaseEntity, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("sample_model")
export class SampleModel extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string
}
