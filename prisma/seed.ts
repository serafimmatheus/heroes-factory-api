import { PrismaClient } from '../generated/prisma/index.js'
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
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Clearing existing heroes...')
  await prisma.hero.deleteMany({})

  console.log('Seeding heroes...')
  const heroesData = Array.from({ length: 110 }).map((_, index) => {
    return {
      name: `Hero Name ${index + 1}`,
      nickname: `Nickname ${index + 1}`,
      date_of_birth: new Date(1970, 0, (index % 28) + 1),
      universe: index % 2 === 0 ? 'Marvel' : 'DC',
      main_power: 'Super Power ' + (index + 1),
      is_active: index % 5 !== 0, // deactivate every 5th hero
    }
  })

  await prisma.hero.createMany({
    data: heroesData,
  })

  console.log('Seeding completed. Inserted', heroesData.length, 'heroes.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
