import { IHeroesRepository } from './contracts/IHeroesRepository.js'
import { CreateHeroInput, UpdateHeroInput, HeroType } from '../../schemas/hero.schema.js'
import { randomUUID } from 'crypto'

export class InMemoryHeroesRepository implements IHeroesRepository {
  public items: HeroType[] = []

  async create(data: CreateHeroInput): Promise<HeroType> {
    const hero: HeroType = {
      id: randomUUID(),
      name: data.name,
      nickname: data.nickname,
      date_of_birth: data.date_of_birth,
      universe: data.universe,
      main_power: data.main_power,
      avatar_url: data.avatar_url ?? null,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    }
    this.items.push(hero)
    return hero
  }

  async update(id: string, data: UpdateHeroInput): Promise<HeroType> {
    const index = this.items.findIndex(h => h.id === id)
    if (index === -1) throw new Error('Hero not found')

    const hero = this.items[index]
    const updatedHero = {
      ...hero,
      ...data,
      updated_at: new Date()
    }
    this.items[index] = updatedHero
    return updatedHero
  }

  async findById(id: string): Promise<HeroType | null> {
    const hero = this.items.find(h => h.id === id)
    return hero ?? null
  }

  async list({ page, limit, search }: { page: number; limit: number; search?: string }): Promise<{ data: HeroType[]; total: number }> {
    let filtered = this.items
    if (search) {
      filtered = filtered.filter(h => h.name.toLowerCase().includes(search.toLowerCase()) || h.nickname.toLowerCase().includes(search.toLowerCase()))
    }
    const total = filtered.length
    const start = (page - 1) * limit
    const end = start + limit
    const data = filtered.slice(start, end)
    return { data, total }
  }

  async deactivate(id: string): Promise<void> {
    const hero = await this.findById(id)
    if (hero) {
      hero.is_active = false
      hero.updated_at = new Date()
    }
  }

  async activate(id: string): Promise<void> {
    const hero = await this.findById(id)
    if (hero) {
      hero.is_active = true
      hero.updated_at = new Date()
    }
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter(h => h.id !== id)
  }
}
