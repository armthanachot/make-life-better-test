import { GENDER, STATUS } from '@/constants/enum'
import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, HasMany } from 'sequelize-typescript'
import { SeminarSpeaker } from './seminar_speaker.model'

@Table({
    tableName: 'speakers',
    charset: 'utf8'
})

export class Speaker extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    private readonly speakerId: number

    @Column
    private readonly citizenId: string

    @Column
    private readonly firstName: string

    @Column
    private readonly middleName: string

    @Column
    private readonly lastName: string

    @Column
    private readonly nickname: string

    @Column
    private readonly nation: string

    @Column({
        type: DataType.ENUM(...Object.values(GENDER))
    })
    private readonly gender: GENDER

    @Column({
        type: DataType.TEXT
    })
    private readonly address: string

    @Column
    private readonly email: string

    @Column
    private readonly phone: string

    @Column({
        type: DataType.TEXT
    })
    private readonly bio: string

    @Column({
        type: DataType.ENUM(...Object.values(STATUS)),
        defaultValue: STATUS.ACTIVE
    })
    private readonly status: STATUS

    @HasMany(() => SeminarSpeaker, { foreignKey: 'speakerId', as: 'seminarSpeakers', onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    private readonly seminarSpeakers: SeminarSpeaker[]
}