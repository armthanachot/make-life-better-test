import { ApiProperty } from "@nestjs/swagger";

class Speaker {
    @ApiProperty()
    public speakerId: number

    public seminarId: number
}
export class CreateSeminarSpeakerDto {
    @ApiProperty({ type: [Speaker] })
    public speakers: Speaker[]
}