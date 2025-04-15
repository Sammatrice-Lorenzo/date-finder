import type { Locator, Page } from '@playwright/test';
import { test, expect } from '@playwright/test';

test('Movies cards', async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`)
  await page.locator('div').filter({ hasText: 'Films' }).nth(3).click()
  await page.goto(`${baseURL}/movies`)

  const textMovies: Locator = page.getByText('Films')
  await textMovies.click()
  page.getByText('Soirée Cinéma (Films à voir chez soi)')
  
  await page.waitForURL(`${baseURL}/movies`, { timeout: 5 })
  await expect(page).toHaveURL(`${baseURL}/movies`, {timeout: 30000})

  await assertMovies(page)
  
  await page.getByRole('button', { name: 'Animation' }).click()
  await assertMovies(page)

  await assertHasGenres(page, 'Animation')

  await page.getByRole('button', { name: 'Animation' }).click()

  await page.getByPlaceholder('Rechercher un film').click()
  await page.getByPlaceholder('Rechercher un film').fill('fast &')

  await assertMovies(page)
  await expect(page.getByRole('img', { name: 'Fast & Furious X' })).toBeVisible()
})

async function assertMovies(page: Page): Promise<void>
{
  await page.waitForSelector('.grid-movies', { timeout: 30000 })

  const movies: Locator = page.locator('.grid-movies')
  const moviesCount: number = await movies.count()

  expect(moviesCount).toBeGreaterThan(1)
}

async function assertHasGenres(page: Page, genre: string): Promise<void>
{
  const movies: Locator = page.locator('.grid-movies')
  const genres: Locator = movies.locator('.MuiTypography-body2').filter({ hasText: 'Genres :'})

  const textGenres: string | null = await genres.first().textContent()
  expect(textGenres?.includes(genre)).toBeTruthy()
}