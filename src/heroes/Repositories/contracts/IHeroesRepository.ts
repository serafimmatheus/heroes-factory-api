import { CreateHeroInput, UpdateHeroInput, HeroType } from '../../../schemas/hero.schema.js'

export interface IHeroesRepository {
  create(data: CreateHeroInput): Promise<HeroType>
  update(id: string, data: UpdateHeroInput): Promise<HeroType>
  findById(id: string): Promise<HeroType | null>
  list(params: { page: number; limit: number; search?: string }): Promise<{ data: HeroType[]; total: number }>
  deactivate(id: string): Promise<void>
  activate(id: string): Promise<void>
}
