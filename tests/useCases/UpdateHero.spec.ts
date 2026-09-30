import { InMemoryHeroesRepository } from '../../src/heroes/Repositories/InMemoryHeroesRepository.js'
import { UpdateHero } from '../../src/heroes/UseCases/UpdateHero.js'

describe('UpdateHero UseCase', () => {
  let heroesRepository: InMemoryHeroesRepository
  let updateHero: UpdateHero

  beforeEach(() => {
    heroesRepository = new InMemoryHeroesRepository()
    updateHero = new UpdateHero(heroesRepository)
  })

  it('should update an existing hero', async () => {
    const hero = await heroesRepository.create({
      name: 'Bruce Wayne',
      nickname: 'Batman',
      date_of_birth: new Date('1939-05-01').toISOString(),
      universe: 'DC',
      main_power: 'Money',
    })

    const updatedHero = await updateHero.execute(hero.id!, {
      name: 'Bruce Wayne (Rich)',
      main_power: 'Gadgets',
    })

    expect(updatedHero.name).toBe('Bruce Wayne (Rich)')
    expect(updatedHero.main_power).toBe('Gadgets')
    expect(updatedHero.universe).toBe('DC') // untouched
  })

  it('should throw an error if hero is not found', async () => {
    await expect(updateHero.execute('invalid-id', { name: 'Test' })).rejects.toThrow('Hero not found')
  })
})
