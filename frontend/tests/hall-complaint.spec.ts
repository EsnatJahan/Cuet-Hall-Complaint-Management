import { test, expect } from '@playwright/test';

test('Home page elemens', async ({ page }) => {
  await page.goto('http://localhost:5173/home');
  await expect(page.getByRole('navigation')).toBeVisible();
  await page.getByRole('heading', { name: 'Efficient Complaint' }).click();
  await expect(page.getByRole('heading', { name: 'Efficient Complaint' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Contact Us' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Efficient Complaint' })).toBeVisible();
});


test('login as student works', async ({ page }) => {
  await page.goto('http://localhost:5173/home');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('ena@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('1234');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Student Dashboard Esnat')).toBeVisible();
})
