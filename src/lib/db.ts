import { PrismaClient } from '../../generated/prisma/index.js'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import mariadb from 'mariadb'

const pool = mariadb.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'heroes_factory',
  port: 3306,
})

const adapter = new PrismaMariaDb(pool)

export const prisma = new PrismaClient({
  adapter,
  log: ['info', 'query', 'warn', 'error']
})
