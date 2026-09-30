import { InMemoryHeroesRepository } from '../../src/heroes/Repositories/InMemoryHeroesRepository.js'
import { CreateHero } from '../../src/heroes/UseCases/CreateHero.js'

describe('CreateHero UseCase', () => {
  let heroesRepository: InMemoryHeroesRepository
  let createHero: CreateHero

  beforeEach(() => {
    heroesRepository = new InMemoryHeroesRepository()
    createHero = new CreateHero(heroesRepository)
  })

  it('should create a new hero', async () => {
    const hero = await createHero.execute({
      name: 'Bruce Wayne',
      nickname: 'Batman',
      date_of_birth: new Date('1939-05-01').toISOString(),
      universe: 'DC',
      main_power: 'Money',
    })

    expect(hero).toHaveProperty('id')
    expect(hero.name).toBe('Bruce Wayne')
    expect(hero.is_active).toBe(true)
    expect(heroesRepository.items).toHaveLength(1)
  })
})
