import { SEMINAR_TYPE } from '@/constants/enum'
import { ApiProperty } from '@nestjs/swagger'

export class CreateSeminarDto {
    @ApiProperty({
        enum: SEMINAR_TYPE
    })
    private readonly seminarType: SEMINAR_TYPE

    @ApiProperty()
    private readonly toppics: string

    @ApiProperty()
    private readonly location: string

    @ApiProperty({
        description:`if you don't have a data for this field please send null value`,
        required: false
    })
    private readonly latitude?: number

    @ApiProperty({
        description:`if you don't have a data for this field please send null value`,
        required: false
    })
    private readonly longitude?: number

    @ApiProperty({
        description: `if seminarType is "ONLINE" this field is not empty (https://...)`,
        required: false
    })
    private readonly seminarUrl: string

    @ApiProperty({
        description:`ISO format (yyyy-mm-dd)`
    })
    private readonly dateFrom: Date

    @ApiProperty({
        description:`ISO format (yyyy-mm-dd)`
    })
    private readonly dateTo: Date

    @ApiProperty()
    private readonly haveFee: Boolean

    @ApiProperty({
        description: `if haveFee is "true" this field must be positive number on then other hand
        if haveFee is "false" this field must be 0 or 0.00
        `
    })
    private readonly fee: number

    @ApiProperty()
    private readonly breakfast: Boolean

    @ApiProperty()
    private readonly lunch: Boolean

    @ApiProperty()
    private readonly dinner: Boolean

    @ApiProperty({
        required: false
    })
    private readonly remark: string
}
