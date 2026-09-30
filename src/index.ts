import Fastify from 'fastify'
import cors from '@fastify/cors'
import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform
} from 'fastify-type-provider-zod'

import { prisma } from './lib/db.js'

import { PrismaHeroesRepository } from './heroes/Repositories/PrismaHeroesRepository.js'
import { CreateHero } from './heroes/UseCases/CreateHero.js'
import { ListHeroes } from './heroes/UseCases/ListHeroes.js'
import { GetHeroById } from './heroes/UseCases/GetHeroById.js'
import { UpdateHero } from './heroes/UseCases/UpdateHero.js'
import { DeactivateHero } from './heroes/UseCases/DeactivateHero.js'
import { ActivateHero } from './heroes/UseCases/ActivateHero.js'
import { heroesRoutes } from './heroes/Routes/heroes.js'

const app = Fastify({ logger: true })

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

import swagger from '@fastify/swagger'
import scalar from '@scalar/fastify-api-reference'

app.register(cors, { origin: '*' })

app.register(swagger, {
  openapi: {
    info: {
      title: 'Heroes Factory API',
      description: 'API para gerenciamento de heróis.',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(scalar, {
  routePrefix: '/api/docs',
})

const heroesRepository = new PrismaHeroesRepository(prisma)
const createHero = new CreateHero(heroesRepository)
const listHeroes = new ListHeroes(heroesRepository)
const getHeroById = new GetHeroById(heroesRepository)
const updateHero = new UpdateHero(heroesRepository)
const deactivateHero = new DeactivateHero(heroesRepository)
const activateHero = new ActivateHero(heroesRepository)

app.register(heroesRoutes, {
  createHero,
  listHeroes,
  getHeroById,
  updateHero,
  deactivateHero,
  activateHero,
})

const start = async () => {
  try {
    await app.listen({ port: 3333, host: '0.0.0.0' })
    console.log(`Server is listening on ${app.server.address()}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
