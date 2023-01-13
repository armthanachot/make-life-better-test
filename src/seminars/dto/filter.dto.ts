import { GENDER, SEMINAR_TYPE } from "@/constants/enum";
import { ApiProperty } from "@nestjs/swagger";

export class FindAllDto {
    @ApiProperty()
    public page: number

    @ApiProperty()
    public pageLimit: number

    @ApiProperty({
        required: false
    })
    public search: string

    @ApiProperty({
        required: false
    })
    public dateFrom: Date

    @ApiProperty({
        required: false
    })
    public dateTo: Date

    @ApiProperty({
        required: false
    })
    public haveFee: Boolean

    @ApiProperty({
        required: false
    })
    public breakfast: Boolean

    @ApiProperty({
        required: false
    })
    public lunch: Boolean

    @ApiProperty({
        required: false
    })
    public dinner: Boolean

    @ApiProperty({
        enum: SEMINAR_TYPE,
        required: false
    })
    public seminarType: Boolean

    public STARTPAGE: number

    public PERPAGE: number
}

export class FindSeminarVisitorDto {
    @ApiProperty()
    public page: number

    @ApiProperty()
    public pageLimit: number

    @ApiProperty({
        required: false
    })
    public search: string

    @ApiProperty({
        enum: GENDER,
        required: false
    })
    public gender: GENDER

    @ApiProperty({
        required: false
    })
    public acceptedInvitation: boolean

    @ApiProperty({
        required: false
    })
    public paid: boolean

    public seminarId: number

    public STARTPAGE: number

    public PERPAGE: number

}