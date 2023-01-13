import { Controller, Get, Post, Body, Param, Req, Res, Query, UseInterceptors, BadRequestException } from '@nestjs/common';
import { SeminarsService } from './seminars.service';
import { CreateSeminarDto } from './dto/create-seminar.dto';
import { ApiTags, ApiBody, ApiExtraModels, ApiConsumes } from '@nestjs/swagger'
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { responseMessages } from '@/utils/response';
import { ValidationPipe } from '@src/validation.pipe';
import { CREATE_SEMINAR, CREATE_SEMINAR_SPEAKER, CREATE_VISITORS, FIND_ALL_SEMINAR, FIND_ALL_SEMINAR_VISITOR } from '@/schema/seminars.schema';
import { FindAllDto, FindSeminarVisitorDto } from './dto/filter.dto';
import { PAGINATION } from '@/utils/pagination';
import { FileUploadDto } from './dto/file-upload.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from '@/utils/file';
import { CreateSeminarSpeakerDto } from './dto/create-seminar-speaker.dto';

const storage = diskStorage({
  destination: './public',
  filename: editFileName
})

@ApiTags('Seminar')
@ApiExtraModels(CreateSeminarDto, FileUploadDto, CreateSeminarSpeakerDto, FindAllDto, FindSeminarVisitorDto,)
@Controller('seminars')
export class SeminarsController {
  constructor(private readonly seminarsService: SeminarsService) { }

  @ApiBody({ type: CreateSeminarDto })
  @Post()
  async create(@Req() req: Request, @Res() res: Response, @Body(new ValidationPipe(CREATE_SEMINAR)) createSeminarDto: CreateSeminarDto) {
    try {
      const created = await this.seminarsService.create(createSeminarDto);
      return res.status(StatusCodes.CREATED).json(responseMessages(StatusCodes.CREATED, null, { seminarId: created.dataValues.seminarId }))
    } catch (error) {
      console.log(`CREATE SEMINAR ERROR: ${error}`);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseMessages(StatusCodes.INTERNAL_SERVER_ERROR))
    }
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FileUploadDto })
  @Post(':id/visitors')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'visitors', maxCount: 1 }], { storage }))
  async importVisitor(@Req() req: Request, @Res() res: Response, @Param('id') seminarId: string) {
    try {
      if (!req.files) return res.status(StatusCodes.BAD_REQUEST).json(responseMessages(StatusCodes.BAD_REQUEST, `FILE MUST BE PROVIDE`))

      const seminar = await this.seminarsService.findOne(+seminarId)
      if (!seminar) return res.status(StatusCodes.NOT_FOUND).json(responseMessages(StatusCodes.NOT_FOUND, `NOT FOUND SEMINAR: ${seminarId}`))

      const file = req.files["visitors"][0]
      const filePath = `./public/${file.filename}`
      let data: any = await this.seminarsService.readCsv(filePath)

      const payload = []
      data.forEach((item) => {
        item.seminarId = Number(seminarId)
        const obj = {}
        Object.entries(item).forEach(item2 => {
          const [key, value] = item2
          obj[key.includes("firstName") ? "firstName" : key] = value
        })
        payload.push(obj)
      })
      try {
        const validationPipe = new ValidationPipe(CREATE_VISITORS);
        await validationPipe.transform({ visitors: payload });
      } catch (error) {
        console.log(`CREATE SEMINAR VISITOR ERROR: ${error}`);
        return res.status(StatusCodes.BAD_REQUEST).json(responseMessages(StatusCodes.BAD_REQUEST, `Validation failed: ${error.message}`))
      }

      await this.seminarsService.createSeminarVisitor(payload)

      return res.status(StatusCodes.CREATED).json(responseMessages(StatusCodes.CREATED, null))
    } catch (error) {
      console.log(`UPLOAD FILE VISITOR ERROR: ${error}`);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseMessages(StatusCodes.INTERNAL_SERVER_ERROR))
    }
  }

  @ApiBody({ type: CreateSeminarSpeakerDto })
  @Post(':id/speakers')
  async createSeminarSpeaker(@Req() req: Request, @Res() res: Response, @Body(new ValidationPipe(CREATE_SEMINAR_SPEAKER)) createSeminarSpeakerDto: CreateSeminarSpeakerDto, @Param('id') seminarId: string) {
    try {
      const seminar = await this.seminarsService.findOne(+seminarId);
      if (!seminar) return res.status(StatusCodes.NOT_FOUND).json(responseMessages(StatusCodes.NOT_FOUND, `NOT FOUND SEMINAR: ${seminarId}`))

      for (const speaker of createSeminarSpeakerDto.speakers) {
        const hasSpeaker = await this.seminarsService.findOneSpeaker(speaker.speakerId)
        if (!hasSpeaker) return res.status(StatusCodes.NOT_FOUND).json(responseMessages(StatusCodes.NOT_FOUND, `NOT FOUND SPEAKER: ${speaker.speakerId}`))
        speaker.seminarId = Number(seminarId)
      }
      await this.seminarsService.createSeminarSpeaker(createSeminarSpeakerDto)
      return res.status(StatusCodes.CREATED).json(responseMessages(StatusCodes.CREATED, null))
    } catch (error) {
      console.log(`CREATE SEMINAR SPEAKER ERROR: ${error}`);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseMessages(StatusCodes.INTERNAL_SERVER_ERROR))
    }
  }

  @Get()
  async findAll(@Req() req: Request, @Res() res: Response, @Query(new ValidationPipe(FIND_ALL_SEMINAR)) query: FindAllDto) {
    try {
      const { page, pageLimit } = query
      const { STARTPAGE, PERPAGE } = PAGINATION(page, pageLimit);
      Object.assign(query, { STARTPAGE, PERPAGE })
      const result = await this.seminarsService.findAll(query);
      return res.status(StatusCodes.OK).json(responseMessages(StatusCodes.OK, null, result))
    } catch (error) {
      console.log(`FIND ALL SEMINAR ERROR: ${error}`);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseMessages(StatusCodes.INTERNAL_SERVER_ERROR))
    }
  }

  @Get(':id/visitors')
  async findSeminarVisitor(@Req() req: Request, @Res() res: Response, @Query(new ValidationPipe(FIND_ALL_SEMINAR_VISITOR)) query: FindSeminarVisitorDto, @Param('id') seminarId: string) {
    try {
      const seminar = await this.seminarsService.findOne(+seminarId);
      if (!seminar) return res.status(StatusCodes.NOT_FOUND).json(responseMessages(StatusCodes.NOT_FOUND, `NOT FOUND SEMINAR: ${seminarId}`))

      const { page, pageLimit } = query
      const { STARTPAGE, PERPAGE } = PAGINATION(page, pageLimit);
      Object.assign(query, { STARTPAGE, PERPAGE, seminarId })
      const result = await this.seminarsService.findSeminarVisitor(query);
      return res.status(StatusCodes.OK).json(responseMessages(StatusCodes.OK, null, result))
    } catch (error) {
      console.log(`FIND ALL SEMINAR VISITOR ERROR: ${error}`);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseMessages(StatusCodes.INTERNAL_SERVER_ERROR))
    }
  }

  @Get(':id')
  async findOne(@Req() req: Request, @Res() res: Response, @Param('id') seminarId: string) {
    try {
      const result = await this.seminarsService.findOne(+seminarId);
      if (!result) return res.status(StatusCodes.NOT_FOUND).json(responseMessages(StatusCodes.NOT_FOUND, `NOT FOUND SEMINAR: ${seminarId}`))
      return res.status(StatusCodes.OK).json(responseMessages(StatusCodes.OK, null, result))
    } catch (error) {
      console.log(`FIND ONE SEMINAR ERROR: ${error}`);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseMessages(StatusCodes.INTERNAL_SERVER_ERROR))
    }
  }
}
