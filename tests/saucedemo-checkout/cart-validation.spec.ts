// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Cart Validation Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to SauceDemo and login before each test
    await page.goto('https://www.saucedemo.com');
    await page.locator('input[name="user-name"]').fill('standard_user');
    await page.locator('input[name="password"]').fill('secret_sauce');
    await page.locator('input#login-button').click();
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('Single Item Cart Display', async ({ page }) => {
    // Add Sauce Labs Onesie to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    // Click on cart icon
    await page.locator('a.shopping_cart_link').click();
    await expect(page).toHaveURL(/.*cart.html/);
    
    // Verify cart page title
    await expect(page.locator('[class*="title"]')).toContainText('Your Cart');
    
    // Verify single item display
    await expect(page.locator('text=Sauce Labs Onesie')).toBeVisible();
    await expect(page.locator('text=$7.99')).toBeVisible();
    await expect(page.locator('button[id="remove-sauce-labs-onesie"]')).toBeVisible();
    
    // Verify quantity
    const quantityElements = page.locator('[class*="cart_quantity"]');
    const count = await quantityElements.count();
    expect(count).toBe(1);
  });

  test('Multiple Items Cart Display', async ({ page }) => {
    // Add multiple items to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
    
    await page.locator('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('3');

    // Click on cart icon
    await page.locator('a.shopping_cart_link').click();
    await expect(page).toHaveURL(/.*cart.html/);
    
    // Verify all 3 items are displayed
    await expect(page.locator('text=Sauce Labs Backpack')).toBeVisible();
    await expect(page.locator('text=Sauce Labs Bike Light')).toBeVisible();
    await expect(page.locator('text=Test.allTheThings() T-Shirt')).toBeVisible();
    
    // Verify prices
    const prices = page.locator('[class*="inventory_item_price"]');
    await expect(prices).toContainText('$29.99'); // Backpack
    await expect(prices).toContainText('$9.99');  // Bike Light
    await expect(prices).toContainText('$15.99'); // T-Shirt
  });

  test('Remove Item From Cart', async ({ page }) => {
    // Setup: Add multiple items
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('3');

    // Navigate to cart
    await page.locator('a.shopping_cart_link').click();
    await expect(page).toHaveURL(/.*cart.html/);

    // Remove Backpack
    await page.locator('button[id="remove-sauce-labs-backpack"]').click();
    
    // Verify Backpack is removed
    await expect(page.locator('text=Sauce Labs Backpack')).not.toBeVisible();
    
    // Verify cart badge updated to 2
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
    
    // Verify other items still present
    await expect(page.locator('text=Sauce Labs Bike Light')).toBeVisible();
    await expect(page.locator('text=Test.allTheThings() T-Shirt')).toBeVisible();
  });

  test('Continue Shopping From Cart', async ({ page }) => {
    // Add items to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

    // Navigate to cart
    await page.locator('a.shopping_cart_link').click();
    await expect(page).toHaveURL(/.*cart.html/);
    
    // Click Continue Shopping
    const continueShoppingButton = page.locator('button').filter({ hasText: 'Continue Shopping' });
    await continueShoppingButton.click();
    
    // Verify returned to inventory page
    await expect(page).toHaveURL(/.*inventory.html/);
    await expect(page.locator('.inventory_container')).toBeVisible();
    
    // Verify cart badge still shows items
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
  });

  test('Cart Displays Various Product Prices', async ({ page }) => {
    // Add Onesie ($7.99) and Fleece Jacket ($49.99)
    await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

    // Navigate to cart
    await page.locator('a.shopping_cart_link').click();
    await expect(page).toHaveURL(/.*cart.html/);
    
    // Verify both items with their prices
    await expect(page.locator('text=Sauce Labs Onesie')).toBeVisible();
    await expect(page.locator('text=Sauce Labs Fleece Jacket')).toBeVisible();
    
    // Verify prices are displayed correctly
    const allText = await page.textContent('body');
    expect(allText).toContain('$7.99');   // Onesie
    expect(allText).toContain('$49.99');  // Fleece Jacket
  });
});