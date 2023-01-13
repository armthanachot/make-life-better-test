import { SEMINAR_TYPE, STATUS } from '@/constants/enum'
import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, HasMany } from 'sequelize-typescript'
import { SeminarSpeaker } from './seminar_speaker.model'
import { Visitor } from './visitor.model'

@Table({
    tableName: 'seminars',
    charset: 'utf8'
})

export class Seminar extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    private readonly seminarId: number

    @Column({
        type: DataType.ENUM(...Object.values(SEMINAR_TYPE))
    })
    private readonly seminarType: SEMINAR_TYPE

    @Column({
        type: DataType.TEXT
    })
    private readonly toppics: string

    @Column({
        type: DataType.TEXT
    })
    private readonly location: string

    @Column({
        type: DataType.DOUBLE
    })
    private readonly latitude: number

    @Column({
        type: DataType.DOUBLE
    })
    private readonly longitude: number

    @Column({
        type: DataType.TEXT
    })
    private readonly seminarUrl: string

    @Column({
        type: DataType.DATE
    })
    private readonly dateFrom: Date

    @Column({
        type: DataType.DATE
    })
    private readonly dateTo: Date

    @Column
    private readonly haveFee: Boolean

    @Column({
        type: DataType.DOUBLE
    })
    private readonly fee: number

    @Column
    private readonly breakfast: Boolean

    @Column
    private readonly lunch: Boolean

    @Column
    private readonly dinner: Boolean

    @Column({
        type: DataType.TEXT
    })
    private readonly remark: string

    @Column({
        type: DataType.ENUM(...Object.values(STATUS)),
        defaultValue: STATUS.ACTIVE
    })
    private readonly status: STATUS

    @HasMany(() => Visitor, { foreignKey: 'seminarId', as: 'visitors', onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    private readonly visitors: Visitor[]

    @HasMany(() => SeminarSpeaker, { foreignKey: 'seminarId', as: 'seminarSpeakers', onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    private readonly seminarSpeakers: SeminarSpeaker[]

}