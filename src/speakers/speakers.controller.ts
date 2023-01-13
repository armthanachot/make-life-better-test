import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, Query } from '@nestjs/common';
import { SpeakersService } from './speakers.service';
import { CreateSpeakerDto } from './dto/create-speaker.dto';
import { UpdateSpeakerDto } from './dto/update-speaker.dto';
import { ApiBody, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { ValidationPipe } from '@src/validation.pipe';
import { CREATE_SPEAKERS } from '@/schema/speakers.schema';
import { responseMessages } from '@/utils/response';
import { FindAllDto } from './dto/filter.dto';
import { PAGINATION } from '@/utils/pagination';
import { FIND_ALL_SPEAKERS } from '@/schema/speakers.schema';

@ApiTags('Speaker')
@ApiExtraModels(CreateSpeakerDto, FindAllDto)
@Controller('speakers')
export class SpeakersController {
  constructor(private readonly speakersService: SpeakersService) { }

  @ApiBody({ type: CreateSpeakerDto })
  @Post()
  async create(@Req() req: Request, @Res() res: Response, @Body(new ValidationPipe(CREATE_SPEAKERS)) createSpeakerDto: CreateSpeakerDto) {
    try {
      const created = await this.speakersService.create(createSpeakerDto);
      return res.status(StatusCodes.CREATED).json(responseMessages(StatusCodes.CREATED, null, { speakerId: created.dataValues.speakerId }))
    } catch (error) {
      console.log(`CREATE SPEAKER ERROR: ${error}`);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseMessages(StatusCodes.INTERNAL_SERVER_ERROR))
    }
  }

  @Get()
  async findAll(@Req() req: Request, @Res() res: Response, @Query(new ValidationPipe(FIND_ALL_SPEAKERS)) query: FindAllDto) {
    try {
      const { page, pageLimit } = query
      const { STARTPAGE, PERPAGE } = PAGINATION(page, pageLimit);
      Object.assign(query, { STARTPAGE, PERPAGE })
      const result = await this.speakersService.findAll(query);
      return res.status(StatusCodes.OK).json(responseMessages(StatusCodes.OK, null, result))
    } catch (error) {
      console.log(`FINDALL SPEAKER ERROR: ${error}`);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseMessages(StatusCodes.INTERNAL_SERVER_ERROR))
    }
  }

  @Get(':id')
  async findOne(@Req() req: Request, @Res() res: Response, @Param('id') speakerId: string) {
    try {
      const result = await this.speakersService.findOne(+speakerId);
      return res.status(StatusCodes.OK).json(responseMessages(StatusCodes.OK, null, result))
    } catch (error) {
      console.log(`FINONE SPEAKER ERROR: ${error}`);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseMessages(StatusCodes.INTERNAL_SERVER_ERROR))
    }
  }
}
