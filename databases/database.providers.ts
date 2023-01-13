import { Seminar } from '@/models/seminar.model'
import { SeminarSpeaker } from '@/models/seminar_speaker.model'
import { Speaker } from '@/models/speaker.model'
import { Visitor } from '@/models/visitor.model'
import { Sequelize } from 'sequelize-typescript'
import * as dotenv from 'dotenv'

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    logging: false,
})

const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            sequelize.addModels([
                Seminar, Speaker, Visitor, SeminarSpeaker
            ])
            await sequelize.sync()
            return sequelize
        }
    }
]

const define = (name, option) => {
    return sequelize.define(name, option)
}
export { databaseProviders, sequelize, define }