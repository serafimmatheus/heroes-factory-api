import { IHeroesRepository } from '../Repositories/contracts/IHeroesRepository.js'
import { UpdateHeroInput } from '../../schemas/hero.schema.js'
import { ErrorNotFound } from '../../errors/ErrorNotFound.js'
import { ErrorBadRequest } from '../../errors/ErrorBadRequest.js'

export class UpdateHero {
  constructor(private readonly heroesRepository: IHeroesRepository) {}

  async execute(id: string, data: UpdateHeroInput) {
    const hero = await this.heroesRepository.findById(id)
    if (!hero) {
      throw new ErrorNotFound('Hero not found')
    }

    if (!hero.is_active) {
      throw new ErrorBadRequest('Cannot edit an inactive hero')
    }

    const updatedHero = await this.heroesRepository.update(id, data)
    return updatedHero
  }
}
