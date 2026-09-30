import { InMemoryHeroesRepository } from '../../src/heroes/Repositories/InMemoryHeroesRepository.js'
import { ListHeroes } from '../../src/heroes/UseCases/ListHeroes.js'

describe('ListHeroes UseCase', () => {
  let heroesRepository: InMemoryHeroesRepository
  let listHeroes: ListHeroes

  beforeEach(() => {
    heroesRepository = new InMemoryHeroesRepository()
    listHeroes = new ListHeroes(heroesRepository)
  })

  it('should list heroes with pagination', async () => {
    await heroesRepository.create({
      name: 'Bruce Wayne',
      nickname: 'Batman',
      date_of_birth: new Date('1939-05-01').toISOString(),
      universe: 'DC',
      main_power: 'Money',
    })
    await heroesRepository.create({
      name: 'Clark Kent',
      nickname: 'Superman',
      date_of_birth: new Date('1938-04-18').toISOString(),
      universe: 'DC',
      main_power: 'Flight',
    })

    const { data, total, page, limit } = await listHeroes.execute({ page: 1, limit: 10 })

    expect(total).toBe(2)
    expect(data).toHaveLength(2)
    expect(page).toBe(1)
    expect(limit).toBe(10)
  })

  it('should filter heroes by search term', async () => {
    await heroesRepository.create({
      name: 'Bruce Wayne',
      nickname: 'Batman',
      date_of_birth: new Date('1939-05-01').toISOString(),
      universe: 'DC',
      main_power: 'Money',
    })
    await heroesRepository.create({
      name: 'Clark Kent',
      nickname: 'Superman',
      date_of_birth: new Date('1938-04-18').toISOString(),
      universe: 'DC',
      main_power: 'Flight',
    })

    const { data, total } = await listHeroes.execute({ page: 1, limit: 10, search: 'batman' })

    expect(total).toBe(1)
    expect(data[0].nickname).toBe('Batman')
  })
})
