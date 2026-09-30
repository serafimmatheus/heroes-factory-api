import { CreateHeroInputSchema, UpdateHeroInputSchema, PaginationSchema } from './hero.schema.js';

describe('Hero Schemas Validation', () => {
  describe('CreateHeroInputSchema', () => {
    it('should pass with valid text and image URL', () => {
      const result = CreateHeroInputSchema.safeParse({
        name: 'Peter Parker',
        nickname: 'Spider-Man',
        date_of_birth: '1990-01-01T00:00:00.000Z',
        universe: 'Marvel',
        main_power: 'Wall-crawling',
        avatar_url: 'https://example.com/spider.png'
      });
      expect(result.success).toBe(true);
    });

    it('should pass with ui-avatars URL', () => {
      const result = CreateHeroInputSchema.safeParse({
        name: 'Clark Kent',
        nickname: 'Superman',
        date_of_birth: '1970-01-01T00:00:00.000Z',
        universe: 'DC',
        main_power: 'Super Strength',
        avatar_url: 'https://ui-avatars.com/api/?name=Clark+Kent&background=random'
      });
      expect(result.success).toBe(true);
    });

    it('should fail with special characters in text fields', () => {
      const result = CreateHeroInputSchema.safeParse({
        name: 'Mathesu9((*(*#($@*Q#(ERWO*DOUS',
        nickname: 'Hacker',
        date_of_birth: '2000-01-01T00:00:00.000Z',
        universe: 'DC',
        main_power: 'Hacking',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some(i => i.path.includes('name'))).toBe(true);
      }
    });

    it('should fail if text is longer than 100 characters', () => {
      const longText = 'A'.repeat(101);
      const result = CreateHeroInputSchema.safeParse({
        name: longText,
        nickname: 'Hero',
        date_of_birth: '2000-01-01T00:00:00.000Z',
        universe: 'Marvel',
        main_power: 'Strength',
      });
      expect(result.success).toBe(false);
    });

    it('should fail if avatar_url is not a valid image link', () => {
      const result = CreateHeroInputSchema.safeParse({
        name: 'Bruce Wayne',
        nickname: 'Batman',
        date_of_birth: '1980-01-01T00:00:00.000Z',
        universe: 'DC',
        main_power: 'Money',
        avatar_url: 'https://gshow.globo.com/noticia.ghtml'
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some(i => i.path.includes('avatar_url'))).toBe(true);
      }
    });

    it('should allow valid image link with query parameters', () => {
      const result = CreateHeroInputSchema.safeParse({
        name: 'Barry Allen',
        nickname: 'The Flash',
        date_of_birth: '1995-01-01T00:00:00.000Z',
        universe: 'DC',
        main_power: 'Speed',
        avatar_url: 'https://example.com/flash.jpg?width=200&height=200'
      });
      expect(result.success).toBe(true);
    });
  });

  describe('UpdateHeroInputSchema', () => {
    it('should pass with partial updates', () => {
      const result = UpdateHeroInputSchema.safeParse({
        nickname: 'Spidey'
      });
      expect(result.success).toBe(true);
    });

    it('should fail with invalid characters in partial update', () => {
      const result = UpdateHeroInputSchema.safeParse({
        universe: 'Marvel!!!!'
      });
      expect(result.success).toBe(false);
    });
  });

  describe('PaginationSchema', () => {
    it('should allow limit 10, 20, 50, 100', () => {
      [10, 20, 50, 100].forEach(limit => {
        const result = PaginationSchema.safeParse({ limit });
        expect(result.success).toBe(true);
      });
    });

    it('should fail for other limits', () => {
      [5, 15, 200].forEach(limit => {
        const result = PaginationSchema.safeParse({ limit });
        expect(result.success).toBe(false);
      });
    });

    it('should default limit to 10 and page to 1', () => {
      const result = PaginationSchema.safeParse({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.limit).toBe(10);
        expect(result.data.page).toBe(1);
      }
    });
  });
});
