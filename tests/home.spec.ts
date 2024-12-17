import DateFormatter from '@/formatters/DateFormatter'
import { test, expect, Page, Locator } from '@playwright/test'

test('App Home', async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`)
  await assertComponentInstallPWA(page)
  const textRestaurant: Locator = await page.getByText('Restaurants')
  await textRestaurant.click()
  page.getByText('Restaurants à proximité')

  await expect(page).toHaveURL(`${baseURL}/restaurants`, {timeout: 15000})
  await assertHandleShareRequestActivity(page)
})

async function assertComponentInstallPWA(page: Page): Promise<void>
{
  const installPrompt: Locator = page.locator('text=Installer DateFinder')
  await expect(installPrompt).toBeVisible({ timeout: 10000 })
}

async function fillModalActivity(page: Page): Promise<void>
{
  const date: Date = new Date()
  date.setDate(date.getDate() + 1)

  await page.getByLabel('Date').fill(DateFormatter.getDateTimeLocal(date))
  await page.getByLabel('Votre nom').fill('John Doe')
  await page.getByLabel('Votre email').fill('john-doe@example.com')
  await page.getByLabel('Nom de la personne invitée').fill('Jack Doe')

  await page.getByRole('button', {name: 'Partager'}).click()
  const errors = await page.locator('#request-activity-errors').allInnerTexts()
  
  expect(errors).toStrictEqual([])
}

async function assertHandleShareRequestActivity(page: Page): Promise<void>
{
  await page.waitForSelector('.place-card')
  const restaurantCard: Locator = page.locator('.place-card').first()
  await restaurantCard.click()

  const dialog: Locator = page.locator('role=dialog')
  await expect(dialog).toBeVisible()
  await expect(dialog).toContainText('Planifier votre rendez-vous')
  await fillModalActivity(page)
}