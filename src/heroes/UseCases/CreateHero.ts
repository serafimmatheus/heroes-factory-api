import { IHeroesRepository } from '../Repositories/contracts/IHeroesRepository.js'
import { CreateHeroInput } from '../../schemas/hero.schema.js'

export class CreateHero {
  constructor(private readonly heroesRepository: IHeroesRepository) {}

  async execute(data: CreateHeroInput) {
    const hero = await this.heroesRepository.create(data)
    return hero
  }
}
