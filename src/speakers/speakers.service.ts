import { STATUS } from '@/constants/enum';
import { Speaker } from '@/models/speaker.model';
import { Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { CreateSpeakerDto } from './dto/create-speaker.dto';
import { FindAllDto } from './dto/filter.dto';
import { UpdateSpeakerDto } from './dto/update-speaker.dto';

@Injectable()
export class SpeakersService {
  constructor(@Inject('SPEAKER_PROVIDER') private readonly speakerProviders: typeof Speaker) { }
  async create(createSpeakerDto: CreateSpeakerDto | any) {
    return await this.speakerProviders.create(createSpeakerDto)
  }

  async findAll({ search, gender, STARTPAGE, PERPAGE }: FindAllDto): Promise<{ rows: Speaker[], count: number }> {
    const whereClause = { status: STATUS.ACTIVE }

    if (search) whereClause[Op.or] = [
      { citizenId: { [Op.like]: `%${search}%` } },
      { firstName: { [Op.like]: `%${search}%` } },
      { middleName: { [Op.like]: `%${search}%` } },
      { lastName: { [Op.like]: `%${search}%` } },
      { nickname: { [Op.like]: `%${search}%` } },
      { address: { [Op.like]: `%${search}%` } },
      { email: { [Op.like]: `%${search}%` } },
      { phone: { [Op.like]: `%${search}%` } },
      { bio: { [Op.like]: `%${search}%` } },
    ]
    if (gender) whereClause['gender'] = gender

    return await this.speakerProviders.findAndCountAll({
      where: whereClause,
      offset: STARTPAGE,
      limit: PERPAGE
    })
  }

  async findOne(speakerId: number) {
    return await this.speakerProviders.findOne({
      where:{
        speakerId
      }
    })
  }
}
