import { z } from 'zod'

export const HeroResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  nickname: z.string(),
  date_of_birth: z.date().or(z.string()),
  universe: z.string(),
  main_power: z.string(),
  avatar_url: z.string().url().nullable().optional(),
  is_active: z.boolean(),
  created_at: z.date().or(z.string()),
  updated_at: z.date().or(z.string()),
})

export const CreateHeroInputSchema = z.object({
  name: z.string().min(1),
  nickname: z.string().min(1),
  date_of_birth: z.string().datetime().or(z.string()),
  universe: z.string().min(1),
  main_power: z.string().min(1),
  avatar_url: z.string().url().refine(val => {
    return !val || /\.(jpeg|jpg|gif|png|webp|svg|bmp)(\?.*)?$/i.test(val) || val.includes('ui-avatars.com');
  }, "Deve ser um link de imagem (jpg, png, etc)").nullable().optional(),
})

export type CreateHeroInput = z.infer<typeof CreateHeroInputSchema>

export const UpdateHeroInputSchema = z.object({
  name: z.string().min(1).optional(),
  nickname: z.string().min(1).optional(),
  date_of_birth: z.string().datetime().or(z.string()).optional(),
  universe: z.string().min(1).optional(),
  main_power: z.string().min(1).optional(),
  avatar_url: z.string().url().refine(val => {
    return !val || /\.(jpeg|jpg|gif|png|webp|svg|bmp)(\?.*)?$/i.test(val) || val.includes('ui-avatars.com');
  }, "Deve ser um link de imagem (jpg, png, etc)").nullable().optional(),
})

export type UpdateHeroInput = z.infer<typeof UpdateHeroInputSchema>

export const PaginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().default(10).refine(val => [10, 20, 50, 100].includes(val), {
    message: "Limit must be 10, 20, 50, or 100"
  }),
  search: z.string().optional(),
})

export type HeroType = z.infer<typeof HeroResponseSchema>
