import { PrismaClient } from "../../../generated/prisma/index.js"
import { IHeroesRepository } from "./contracts/IHeroesRepository.js"
import { CreateHeroInput, HeroType, UpdateHeroInput } from "../../schemas/hero.schema.js"

export class PrismaHeroesRepository implements IHeroesRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: CreateHeroInput): Promise<HeroType> {
    const hero = await this.prisma.hero.create({
      data: {
        ...data,
        date_of_birth: new Date(data.date_of_birth),
      },
    })
    return hero
  }

  async update(id: string, data: UpdateHeroInput): Promise<HeroType> {
    const hero = await this.prisma.hero.update({
      where: { id },
      data: {
        ...data,
        date_of_birth: data.date_of_birth ? new Date(data.date_of_birth) : undefined,
      },
    })
    return hero
  }

  async findById(id: string): Promise<HeroType | null> {
    const hero = await this.prisma.hero.findUnique({
      where: { id },
    })
    return hero
  }

  async list(params: { page: number; limit: number; search?: string }): Promise<{ data: HeroType[]; total: number }> {
    const { page, limit, search } = params

    const where = search
      ? {
          OR: [
            { name: { contains: search } },
            { nickname: { contains: search } },
          ],
        }
      : {}

    const [heroes, total] = await Promise.all([
      this.prisma.hero.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: [{ created_at: 'desc' }, { id: 'desc' }],
      }),
      this.prisma.hero.count({ where }),
    ])

    return { data: heroes, total }
  }

  async deactivate(id: string): Promise<void> {
    await this.prisma.hero.update({
      where: { id },
      data: { is_active: false },
    })
  }

  async activate(id: string): Promise<void> {
    await this.prisma.hero.update({
      where: { id },
      data: { is_active: true },
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.hero.delete({
      where: { id },
    })
  }
}
