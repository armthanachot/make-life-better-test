import { ApiProperty } from "@nestjs/swagger"

export class CreateSpeakerDto {
    
    @ApiProperty()
    citizenId: string
    
    @ApiProperty()
    firstName: string
    
    @ApiProperty({
        required:false
    })
    middleName: string
    
    @ApiProperty()
    lastName: string
    
    @ApiProperty({
        required:false
    })
    nickname: string
    
    @ApiProperty()
    nation: string
    
    @ApiProperty()
    gender: string
    
    @ApiProperty()
    address: string
    
    @ApiProperty()
    email: string
    
    @ApiProperty({
        required:false
    })
    phone: string
    
    @ApiProperty({
        required:false
    })
    bio: string

}
