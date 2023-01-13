import { GENDER } from '@/constants/enum'
import * as joi from 'joi'

const CREATE_SPEAKERS = joi.object({
    citizenId: joi.string().min(8).max(13).required(),
    firstName: joi.string().required(),
    middleName: joi.string().allow(null).required(),
    lastName: joi.string().required(),
    nickname: joi.string().allow(null).required(),
    nation: joi.string().allow(null).required(),
    gender: joi.string().valid(...Object.values(GENDER)).required(),
    address: joi.string().allow(null).required(),
    email: joi.string().email().required(),
    phone: joi.string().pattern(/^(?:\+\d{1,3}[-.\s]?)?\d{3}[-.\s]?\d{3}[-.\s]?\d{4}$/).allow(null).required(),
    bio: joi.string().allow(null).required()
}).required()

const FIND_ALL_SPEAKERS = joi.object({
    page: joi.number().positive().integer().min(1).required(),
    pageLimit:joi.number().positive().integer().min(1).required(),
    search: joi.string(),
    gender: joi.string().valid(...Object.values(GENDER))
})

export { CREATE_SPEAKERS, FIND_ALL_SPEAKERS }