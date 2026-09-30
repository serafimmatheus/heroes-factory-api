import { IHeroesRepository } from '../Repositories/contracts/IHeroesRepository.js'
import { ErrorNotFound } from '../../errors/ErrorNotFound.js'

export class GetHeroById {
  constructor(private readonly heroesRepository: IHeroesRepository) {}

  async execute(id: string) {
    const hero = await this.heroesRepository.findById(id)
    if (!hero) {
      throw new ErrorNotFound('Hero not found')
    }
    return hero
  }
}
