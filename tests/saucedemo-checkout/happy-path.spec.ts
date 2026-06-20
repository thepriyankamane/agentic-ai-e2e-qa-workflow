// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Happy Path Checkout Test', () => {
  test('Complete Checkout Flow', async ({ page }) => {
    // 1. Navigate to SauceDemo login page
    await page.goto('https://www.saucedemo.com');
    await expect(page).toHaveURL(/.*saucedemo.com\/?$/);
    
    // 2. Login with username 'standard_user' and password 'secret_sauce'
    await page.locator('input[name="user-name"]').fill('standard_user');
    await page.locator('input[name="password"]').fill('secret_sauce');
    await page.locator('input#login-button').click();
    await expect(page).toHaveURL(/.*inventory.html/);
    await expect(page.locator('.inventory_container')).toBeVisible();
    
    // 3. Add Sauce Labs Backpack to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    
    // 4. Add Sauce Labs Bike Light to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
    
    // 5. Click on cart icon to view cart
    await page.locator('a.shopping_cart_link').click();
    await expect(page).toHaveURL(/.*cart.html/);
    await expect(page.locator('[class*="title"]')).toContainText('Your Cart');
    
    // Verify both items are in cart
    await expect(page.locator('text=Sauce Labs Backpack')).toBeVisible();
    await expect(page.locator('text=Sauce Labs Bike Light')).toBeVisible();
    await expect(page.locator('text=$29.99')).toBeVisible();
    await expect(page.locator('text=$9.99')).toBeVisible();
    
    // 6. Click Checkout button
    const checkoutButton = page.locator('button').filter({ hasText: 'Checkout' });
    await checkoutButton.click();
    await expect(page).toHaveURL(/.*checkout-step-one.html/);
    await expect(page.locator('[class*="title"]')).toContainText('Checkout: Your Information');
    
    // 7. Fill form with First Name 'John', Last Name 'Doe', Zip Code '12345'
    await page.locator('input[data-test="firstName"]').fill('John');
    await page.locator('input[data-test="lastName"]').fill('Doe');
    await page.locator('input[data-test="postalCode"]').fill('12345');
    
    // Verify form fields are filled
    await expect(page.locator('input[data-test="firstName"]')).toHaveValue('John');
    await expect(page.locator('input[data-test="lastName"]')).toHaveValue('Doe');
    await expect(page.locator('input[data-test="postalCode"]')).toHaveValue('12345');
    
    // 8. Click Continue button
    await page.locator('input[id="continue"]').click();
    await expect(page).toHaveURL(/.*checkout-step-two.html/);
    
    // 9. Verify order summary displays both items with correct prices
    await expect(page.locator('[class*="title"]')).toContainText('Checkout: Overview');
    await expect(page.locator('text=Sauce Labs Backpack')).toBeVisible();
    await expect(page.locator('text=Sauce Labs Bike Light')).toBeVisible();
    await expect(page.locator('text=$29.99')).toBeVisible();
    await expect(page.locator('text=$9.99')).toBeVisible();
    
    // Verify price calculations
    await expect(page.locator('text=Item total: $39.98')).toBeVisible();
    await expect(page.locator('text=Tax: $3.20')).toBeVisible();
    await expect(page.locator('text=Total: $43.18')).toBeVisible();
    
    // Verify payment and shipping information
    await expect(page.locator('text=SauceCard #31337')).toBeVisible();
    await expect(page.locator('text=Free Pony Express Delivery!')).toBeVisible();
    
    // 10. Click Finish button
    await page.locator('button[id="finish"]').click();
    await expect(page).toHaveURL(/.*checkout-complete.html/);
    
    // 11. Verify success message 'Thank you for your order!'
    await expect(page.locator('h2')).toContainText('Thank you for your order!');
    await expect(page.locator('text=Your order has been dispatched')).toBeVisible();
    await expect(page.locator('button:has-text("Back Home")')).toBeVisible();
  });
});