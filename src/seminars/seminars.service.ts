import { STATUS } from '@/constants/enum';
import { Seminar } from '@/models/seminar.model';
import { Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { CreateSeminarDto } from './dto/create-seminar.dto';
import { FindAllDto, FindSeminarVisitorDto } from './dto/filter.dto';

import * as fs from 'fs'
import * as csv from 'csv-parser';
import { Visitor } from '@/models/visitor.model';
import { Speaker } from '@/models/speaker.model';
import { CreateSeminarSpeakerDto } from './dto/create-seminar-speaker.dto';
import { SeminarSpeaker } from '@/models/seminar_speaker.model';

@Injectable()
export class SeminarsService {
  constructor(
    @Inject('SEMINAR_PROVIDER')
    private readonly seminarProvider: typeof Seminar,

    @Inject('VISITOR_PROVIDER')
    private readonly visitorProvider: typeof Visitor,

    @Inject('SPEAKER_PROVIDER')
    private readonly speakerProvider: typeof Speaker,

    @Inject('SEMINAR_SPEAKER_PROVIDER')
    private readonly seminarSpeakerProvider: typeof SeminarSpeaker,
  ) { }

  async create(createSeminarDto: CreateSeminarDto | any) {
    /** INSERT INTO seminar SET ? */
    return await this.seminarProvider.create(createSeminarDto);
  }

  async createSeminarSpeaker(payload: CreateSeminarSpeakerDto | any) {
    return await this.seminarSpeakerProvider.bulkCreate(payload.speakers)
  }

  async createSeminarVisitor(payload) {
    return await this.visitorProvider.bulkCreate(payload)
  }


  async findAll({ search, dateFrom, dateTo, haveFee, breakfast, lunch, dinner, seminarType, STARTPAGE, PERPAGE }: FindAllDto): Promise<{ rows: Seminar[], count: number }> {
    const whereClause = { status: STATUS.ACTIVE }

    if (search) whereClause[Op.or] = [{ toppics: { [Op.like]: `%${search}%` } }, { remark: { [Op.like]: `%${search}%` } }, { location: { [Op.like]: `%${search}%` } }, { seminarUrl: { [Op.like]: `%${search}%` } }]
    if (dateFrom) whereClause['dateFrom'] = { [Op.gte]: dateFrom }
    if (dateTo) whereClause['dateTo'] = { ...whereClause['dateFrom'], [Op.lte]: dateTo }
    if (haveFee) whereClause['haveFee'] = haveFee
    if (breakfast) whereClause['breakfast'] = breakfast
    if (lunch) whereClause['lunch'] = lunch
    if (dinner) whereClause['dinner'] = dinner
    if (seminarType) whereClause['seminarType'] = seminarType

    const { rows, count } = await this.seminarProvider.findAndCountAll({
      where: whereClause,
      offset: STARTPAGE,
      limit: PERPAGE
    })
    /**
     * SELECT ... FROM seminars WHERE (col1 LIKE `%${search}%` OR col2 LIKE `%${search}%`) AND ...
     * LIMIT ?,?
     * 
     * SELECT COUNT(*) AS `count` FROM seminars WHERE (col1 LIKE `%${search}%` OR col2 LIKE `%${search}%`) AND ...
     */
    return { rows, count }
  }

  async findSeminarVisitor({ search, acceptedInvitation, paid, STARTPAGE, PERPAGE, seminarId }: FindSeminarVisitorDto): Promise<{ rows: Visitor[], count: number }> {
    const whereClause = { seminarId, status: STATUS.ACTIVE }

    if (search) whereClause[Op.or] = [{ firstName: { [Op.like]: `%${search}%` } }, { middleName: { [Op.like]: `%${search}%` } }, { lastName: { [Op.like]: `%${search}%` } }, { nickname: { [Op.like]: `%${search}%` } }, { nation: { [Op.like]: `%${search}%` } }, { address: { [Op.like]: `%${search}%` } }, { email: { [Op.like]: `%${search}%` } }, { phone: { [Op.like]: `%${search}%` } }]
    if (acceptedInvitation) whereClause['acceptedInvitation'] = acceptedInvitation
    if (paid) whereClause['paid'] = paid

    const { rows, count } = await this.visitorProvider.findAndCountAll({
      where: whereClause,
      offset: STARTPAGE,
      limit: PERPAGE
    })
    /**
     * SELECT ... FROM visitors WHERE (col1 LIKE `%${search}%` OR col2 LIKE `%${search}%`) AND ...
     * LIMIT ?,?
     * 
     * SELECT COUNT(*) AS `count` FROM visitors WHERE (col1 LIKE `%${search}%` OR col2 LIKE `%${search}%`) AND ...
     */
    return { rows, count }
  }

  async findOne(seminarId: number): Promise<Seminar> {
    /** SELECT ... FROM seminars WHERE seminarId = ? */
    return await this.seminarProvider.findOne({
      include: [
        {
          model: Visitor
        },
        {
          model: SeminarSpeaker,
          include:[
            {
              model:Speaker
            }
          ]
        }
      ],
      where: { seminarId },
    })
  }

  async findOneSpeaker(speakerId: number): Promise<Speaker> {
    return await this.speakerProvider.findOne({ where: { speakerId } })
  }


  async readCsv(filePath: string) {
    const data = [];
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          data.push(row);
        })
        .on('end', () => {
          resolve(data);
        });
    });
  }
}
