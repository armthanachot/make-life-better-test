import { GENDER, SEMINAR_TYPE } from '@/constants/enum'
import * as joi from 'joi'

const CREATE_SEMINAR = joi.object({
    seminarType: joi.string().valid(...Object.values(SEMINAR_TYPE)).required(),
    toppics: joi.string().required(),
    location: joi.string().required(),
    latitude: joi.number().allow(null).required(),
    longitude: joi.number().allow(null).required(),
    seminarUrl: joi.string().when(`seminarType`, {
        is: SEMINAR_TYPE.ONLINE,
        then: joi.string().uri().required(),
        otherwise: joi.string().valid(null)
    }).required(),
    dateFrom: joi.date().iso().required(),
    dateTo: joi.date().iso().min(joi.ref(`dateFrom`)).required(),
    haveFee: joi.boolean().required(),
    fee: joi.when(`haveFee`, {
        is: true,
        then: joi.number().positive(),
        otherwise: joi.number().valid(0.00, 0)
    }).required(),
    breakfast: joi.boolean().required(),
    lunch: joi.boolean().required(),
    dinner: joi.boolean().required(),
    remark: joi.string().allow(null,``).required(),
}).required()

const FIND_ALL_SEMINAR = joi.object({
    page: joi.number().positive().integer().min(1).required(),
    pageLimit: joi.number().positive().integer().min(1).required(),
    search: joi.string(),
    dateFrom: joi.date().iso(),
    dateTo: joi.date().min(joi.ref('dateFrom')).iso(),
    haveFee: joi.boolean(),
    breakfast: joi.boolean(),
    lunch: joi.boolean(),
    dinner: joi.boolean(),
    seminarType: joi.string().valid(...Object.values(SEMINAR_TYPE)),
}).required()


// seminarId use in param
const CREATE_VISITORS = joi.object({
    visitors: joi.array().min(1).items({
        seminarId: joi.number().positive().integer().min(1).required(), // new visitor = null, old visitor = not null
        firstName: joi.string().required(),
        middleName: joi.string().allow(null,``).required(),
        lastName: joi.string().required(),
        nickname: joi.string().allow(null,``).required(),
        nation: joi.string().allow(null,``).required(),
        address: joi.string().allow(null,``).required(),
        email: joi.string().required(),
        phone: joi.string().allow(null,``).required(),
        gender: joi.string().valid(...Object.values(GENDER)).required(),
    }).required()
})

const FIND_ALL_SEMINAR_VISITOR = joi.object({
    page: joi.number().positive().integer().min(1).required(),
    pageLimit: joi.number().positive().integer().min(1).required(),
    search: joi.string(),
    gender: joi.string().valid(...Object.values(GENDER)),
    acceptedInvitation: joi.boolean(),
    paid: joi.boolean(),
})

const CREATE_SEMINAR_SPEAKER = joi.object({
    speakers: joi.array().items({
        speakerId: joi.number().positive().integer().min(1).required(),
    }).required()
}).required()

export {
    CREATE_SEMINAR,
    FIND_ALL_SEMINAR,
    CREATE_VISITORS,
    FIND_ALL_SEMINAR_VISITOR,
    CREATE_SEMINAR_SPEAKER
}