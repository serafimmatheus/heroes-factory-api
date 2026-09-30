import { IHeroesRepository } from '../Repositories/contracts/IHeroesRepository.js'

export class ListHeroes {
  constructor(private readonly heroesRepository: IHeroesRepository) {}

  async execute(params: { page: number; limit: number; search?: string }) {
    const { data, total } = await this.heroesRepository.list(params)
    return { data, total, page: params.page, limit: params.limit }
  }
}
