import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { CreateHeroInputSchema, UpdateHeroInputSchema, PaginationSchema, HeroResponseSchema } from '../../schemas/hero.schema.js'
import { CreateHero } from '../UseCases/CreateHero.js'
import { ListHeroes } from '../UseCases/ListHeroes.js'
import { GetHeroById } from '../UseCases/GetHeroById.js'
import { UpdateHero } from '../UseCases/UpdateHero.js'
import { DeactivateHero } from '../UseCases/DeactivateHero.js'
import { ActivateHero } from '../UseCases/ActivateHero.js'
import { DeleteHero } from '../UseCases/DeleteHero.js'
import { ErrorNotFound } from '../../errors/ErrorNotFound.js'
import { ErrorBadRequest } from '../../errors/ErrorBadRequest.js'

export interface HeroesRoutesOptions {
  createHero: CreateHero
  listHeroes: ListHeroes
  getHeroById: GetHeroById
  updateHero: UpdateHero
  deactivateHero: DeactivateHero
  activateHero: ActivateHero
  deleteHero: DeleteHero
}

export async function heroesRoutes(app: FastifyInstance, options: HeroesRoutesOptions) {
  const server = app.withTypeProvider<ZodTypeProvider>()

  server.post('/heroes', {
    schema: {
      tags: ['Heroes'],
      summary: 'Create a new hero',
      description: 'Creates a new hero in the factory',
      body: CreateHeroInputSchema,
      response: {
        201: HeroResponseSchema,
      },
    },
  }, async (request, reply) => {
    const hero = await options.createHero.execute(request.body)
    return reply.status(201).send(hero)
  })

  server.get('/heroes', {
    schema: {
      tags: ['Heroes'],
      summary: 'List heroes',
      description: 'List heroes with pagination and search',
      querystring: PaginationSchema,
      response: {
        200: z.object({
          data: z.array(HeroResponseSchema),
          total: z.number(),
          page: z.number(),
          limit: z.number(),
        }),
      },
    },
  }, async (request, reply) => {
    const result = await options.listHeroes.execute(request.query)
    return reply.send(result)
  })

  server.get('/heroes/:id', {
    schema: {
      tags: ['Heroes'],
      summary: 'Get a hero by id',
      description: 'Get details of a specific hero',
      params: z.object({
        id: z.string().uuid(),
      }),
      response: {
        200: HeroResponseSchema,
        404: z.object({ error: z.string() }),
      },
    },
  }, async (request, reply) => {
    try {
      const hero = await options.getHeroById.execute(request.params.id)
      return reply.send(hero)
    } catch (error) {
      if (error instanceof ErrorNotFound) {
        return reply.status(404).send({ error: error.message })
      }
      throw error
    }
  })

  server.put('/heroes/:id', {
    schema: {
      tags: ['Heroes'],
      summary: 'Update a hero',
      description: 'Update a hero\'s details',
      params: z.object({
        id: z.string().uuid(),
      }),
      body: UpdateHeroInputSchema,
      response: {
        200: HeroResponseSchema,
        400: z.object({ error: z.string() }),
        404: z.object({ error: z.string() }),
      },
    },
  }, async (request, reply) => {
    try {
      const hero = await options.updateHero.execute(request.params.id, request.body)
      return reply.send(hero)
    } catch (error) {
      if (error instanceof ErrorNotFound) {
        return reply.status(404).send({ error: error.message })
      }
      if (error instanceof ErrorBadRequest) {
        return reply.status(400).send({ error: error.message })
      }
      throw error
    }
  })

  server.patch('/heroes/:id/deactivate', {
    schema: {
      tags: ['Heroes'],
      summary: 'Deactivate a hero',
      description: 'Deactivates a hero by setting is_active to false',
      params: z.object({
        id: z.string().uuid(),
      }),
      response: {
        200: z.object({ message: z.string() }),
        404: z.object({ error: z.string() }),
      },
    },
  }, async (request, reply) => {
    try {
      await options.deactivateHero.execute(request.params.id)
      return reply.send({ message: 'Hero deactivated' })
    } catch (error) {
      if (error instanceof ErrorNotFound) {
        return reply.status(404).send({ error: error.message })
      }
      throw error
    }
  })

  server.delete('/heroes/:id', {
    schema: {
      tags: ['Heroes'],
      summary: 'Delete a hero',
      description: 'Permanently deletes a hero',
      params: z.object({
        id: z.string().uuid(),
      }),
      response: {
        200: z.object({ message: z.string() }),
        404: z.object({ error: z.string() }),
      },
    },
  }, async (request, reply) => {
    try {
      await options.deleteHero.execute(request.params.id)
      return reply.send({ message: 'Hero deleted' })
    } catch (error) {
      if (error instanceof ErrorNotFound) {
        return reply.status(404).send({ error: error.message })
      }
      throw error
    }
  })

  server.patch('/heroes/:id/activate', {
    schema: {
      tags: ['Heroes'],
      summary: 'Activate a hero',
      description: 'Activates a hero by setting is_active to true',
      params: z.object({
        id: z.string().uuid(),
      }),
      response: {
        200: z.object({ message: z.string() }),
        404: z.object({ error: z.string() }),
      },
    },
  }, async (request, reply) => {
    try {
      await options.activateHero.execute(request.params.id)
      return reply.send({ message: 'Hero activated' })
    } catch (error) {
      if (error instanceof ErrorNotFound) {
        return reply.status(404).send({ error: error.message })
      }
      throw error
    }
  })
}
