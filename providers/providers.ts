import { Seminar } from "@/models/seminar.model";
import { SeminarSpeaker } from "@/models/seminar_speaker.model";
import { Speaker } from "@/models/speaker.model";
import { Visitor } from "@/models/visitor.model";

const seminarProviders = [{ provide: 'SEMINAR_PROVIDER', useValue: Seminar }]

const speakerProviders = [{ provide: 'SPEAKER_PROVIDER', useValue: Speaker }]

const visitorProviders = [{ provide: 'VISITOR_PROVIDER', useValue: Visitor }]

const seminarSpeakerProviders = [{ provide: 'SEMINAR_SPEAKER_PROVIDER', useValue: SeminarSpeaker }]

export {
    seminarProviders,
    speakerProviders,
    visitorProviders,
    seminarSpeakerProviders
}