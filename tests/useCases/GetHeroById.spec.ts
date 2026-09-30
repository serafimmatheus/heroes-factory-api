import { InMemoryHeroesRepository } from '../../src/heroes/Repositories/InMemoryHeroesRepository.js'
import { GetHeroById } from '../../src/heroes/UseCases/GetHeroById.js'

describe('GetHeroById UseCase', () => {
  let heroesRepository: InMemoryHeroesRepository
  let getHeroById: GetHeroById

  beforeEach(() => {
    heroesRepository = new InMemoryHeroesRepository()
    getHeroById = new GetHeroById(heroesRepository)
  })

  it('should get a hero by id', async () => {
    const createdHero = await heroesRepository.create({
      name: 'Bruce Wayne',
      nickname: 'Batman',
      date_of_birth: new Date('1939-05-01').toISOString(),
      universe: 'DC',
      main_power: 'Money',
    })

    const hero = await getHeroById.execute(createdHero.id!)
    expect(hero?.name).toBe('Bruce Wayne')
  })

  it('should throw an error if hero is not found', async () => {
    await expect(getHeroById.execute('invalid-id')).rejects.toThrow('Hero not found')
  })
})
