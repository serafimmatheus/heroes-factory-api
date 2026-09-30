
import { DeleteHero } from '../../src/heroes/UseCases/DeleteHero.js'
import { InMemoryHeroesRepository } from '../../src/heroes/Repositories/InMemoryHeroesRepository.js'
import { ErrorNotFound } from '../../src/errors/ErrorNotFound.js'

describe('DeleteHero', () => {
  let heroesRepository: InMemoryHeroesRepository
  let deleteHero: DeleteHero

  beforeEach(() => {
    heroesRepository = new InMemoryHeroesRepository()
    deleteHero = new DeleteHero(heroesRepository)
  })

  it('should permanently delete an existing hero', async () => {
    const hero = await heroesRepository.create({
      name: 'Superman',
      nickname: 'Clark Kent',
      date_of_birth: '1970-01-01',
      universe: 'DC',
      main_power: 'Super strength',
    })

    await deleteHero.execute(hero.id)

    const deletedHero = await heroesRepository.findById(hero.id)
    expect(deletedHero).toBeNull()
  })

  it('should throw an ErrorNotFound if hero does not exist', async () => {
    await expect(deleteHero.execute('non-existent-id')).rejects.toBeInstanceOf(ErrorNotFound)
  })
})
