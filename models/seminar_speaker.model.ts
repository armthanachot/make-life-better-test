import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Seminar } from "./seminar.model";
import { Speaker } from "./speaker.model";

@Table({
    tableName: 'seminar_speakers',
    charset: 'utf8'
})
export class SeminarSpeaker extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    private readonly seminarSpeakerId: number
    
    @Column({ type: DataType.INTEGER })
    @ForeignKey(() => Seminar)
    private readonly seminarId: number
    
    @Column({ type: DataType.INTEGER })
    @ForeignKey(() => Speaker)
    private readonly speakerId: number

    @BelongsTo(() => Seminar)
    seminar: Seminar

    @BelongsTo(() => Speaker)
    speaker: Speaker

}