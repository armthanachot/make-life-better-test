import { GENDER, STATUS } from "@/constants/enum";
import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Seminar } from "./seminar.model";

@Table({
    tableName: 'visitors',
    charset: 'utf8'
})
export class Visitor extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    private readonly visitorId: number

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

    @Column
    private readonly acceptedInvitation: Boolean

    @Column
    private readonly paid: Boolean

    @Column({
        type: DataType.ENUM(...Object.values(STATUS)),
        defaultValue: STATUS.ACTIVE
    })
    private readonly status: STATUS

    @Column({ type: DataType.INTEGER })
    @ForeignKey(() => Seminar)
    private readonly seminarId: number

    @BelongsTo(() => Seminar)
    seminar: Seminar
}