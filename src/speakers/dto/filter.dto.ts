import { GENDER } from "@/constants/enum"
import { ApiProperty } from "@nestjs/swagger"

export class FindAllDto {
    @ApiProperty()
    public page: number

    @ApiProperty()
    public pageLimit: number

    @ApiProperty({
        required:false
    })
    search: string

    @ApiProperty({
        required:false
    })
    gender: GENDER

    public STARTPAGE: number

    public PERPAGE: number
}