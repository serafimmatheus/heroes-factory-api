import { InMemoryHeroesRepository } from '../../src/heroes/Repositories/InMemoryHeroesRepository.js'
import { ActivateHero } from '../../src/heroes/UseCases/ActivateHero.js'

describe('ActivateHero UseCase', () => {
  let heroesRepository: InMemoryHeroesRepository
  let activateHero: ActivateHero

  beforeEach(() => {
    heroesRepository = new InMemoryHeroesRepository()
    activateHero = new ActivateHero(heroesRepository)
  })

  it('should activate a deactivated hero', async () => {
    const hero = await heroesRepository.create({
      name: 'Bruce Wayne',
      nickname: 'Batman',
      date_of_birth: new Date('1939-05-01').toISOString(),
      universe: 'DC',
      main_power: 'Money',
    })

    await heroesRepository.deactivate(hero.id!)
    
    await activateHero.execute(hero.id!)

    const updatedHero = await heroesRepository.findById(hero.id!)
    expect(updatedHero?.is_active).toBe(true)
  })
})
