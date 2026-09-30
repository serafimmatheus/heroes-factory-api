import { IHeroesRepository } from '../Repositories/contracts/IHeroesRepository.js'
import { ErrorNotFound } from '../../errors/ErrorNotFound.js'

export class DeleteHero {
  constructor(private readonly heroesRepository: IHeroesRepository) {}

  async execute(id: string): Promise<void> {
    const hero = await this.heroesRepository.findById(id)
    if (!hero) {
      throw new ErrorNotFound('Hero not found')
    }

    await this.heroesRepository.delete(id)
  }
}
