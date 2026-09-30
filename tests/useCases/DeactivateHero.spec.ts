import { InMemoryHeroesRepository } from '../../src/heroes/Repositories/InMemoryHeroesRepository.js'
import { DeactivateHero } from '../../src/heroes/UseCases/DeactivateHero.js'

describe('DeactivateHero UseCase', () => {
  let heroesRepository: InMemoryHeroesRepository
  let deactivateHero: DeactivateHero

  beforeEach(() => {
    heroesRepository = new InMemoryHeroesRepository()
    deactivateHero = new DeactivateHero(heroesRepository)
  })

  it('should deactivate a hero', async () => {
    const hero = await heroesRepository.create({
      name: 'Bruce Wayne',
      nickname: 'Batman',
      date_of_birth: new Date('1939-05-01').toISOString(),
      universe: 'DC',
      main_power: 'Money',
    })

    await deactivateHero.execute(hero.id!)

    const updatedHero = await heroesRepository.findById(hero.id!)
    expect(updatedHero?.is_active).toBe(false)
  })
})
