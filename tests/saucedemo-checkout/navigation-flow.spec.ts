// spec: specs/saucedemo-checkout-test-plan.md
// Test Suite: Navigation and Flow Tests

import { test, expect } from '@playwright/test';

test.describe('Navigation and Flow Tests', () => {
  test('Complete Checkout Flow from Inventory to Confirmation', async ({ page }) => {
    // 1. Login
    await page.goto('https://www.saucedemo.com');
    await page.locator('input[name="user-name"]').fill('standard_user');
    await page.locator('input[name="password"]').fill('secret_sauce');
    await page.locator('input#login-button').click();
    await page.waitForURL(/.*inventory.html/);
    
    // 2. Add items
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    
    // 3. View cart
    await page.locator('a.shopping_cart_link').click();
    await page.waitForURL(/.*cart.html/);
    
    // 4. Checkout
    await page.locator('button:has-text("Checkout")').click();
    await page.waitForURL(/.*checkout-step-one.html/);
    
    // 5. Fill form
    await page.locator('input[data-test="firstName"]').fill('John');
    await page.locator('input[data-test="lastName"]').fill('Doe');
    await page.locator('input[data-test="postalCode"]').fill('12345');
    await page.locator('button:has-text("Continue")').click();
    
    // 6. Review order
    await page.waitForURL(/.*checkout-step-two.html/);
    await expect(page.locator('text=Sauce Labs Backpack')).toBeVisible();
    await expect(page.locator('text=Sauce Labs Bolt T-Shirt')).toBeVisible();
    
    // 7. Complete order
    await page.locator('button:has-text("Finish")').click();
    await page.waitForURL(/.*checkout-complete.html/);
    
    // 8. Verify success
    await expect(page.locator('text=Thank you for your order!')).toBeVisible();
  });

  test('Cancel from Checkout Step One', async ({ page }) => {
    // Login and navigate to checkout
    await page.goto('https://www.saucedemo.com');
    await page.locator('input[name="user-name"]').fill('standard_user');
    await page.locator('input[name="password"]').fill('secret_sauce');
    await page.locator('input#login-button').click();
    await page.waitForURL(/.*inventory.html/);
    
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('a.shopping_cart_link').click();
    await page.waitForURL(/.*cart.html/);
    
    await page.locator('button:has-text("Checkout")').click();
    await page.waitForURL(/.*checkout-step-one.html/);
    
    // Click cancel
    const cancelButton = page.locator('button').filter({ hasText: 'Cancel' });
    await cancelButton.click();
    
    // Verify return to cart
    await page.waitForURL(/.*cart.html/);
    await expect(page).toHaveURL(/.*cart.html/);
  });

  test('Cancel from Checkout Step Two', async ({ page }) => {
    // Setup: Login and reach step two
    await page.goto('https://www.saucedemo.com');
    await page.locator('input[name="user-name"]').fill('standard_user');
    await page.locator('input[name="password"]').fill('secret_sauce');
    await page.locator('input#login-button').click();
    await page.waitForURL(/.*inventory.html/);
    
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('a.shopping_cart_link').click();
    await page.waitForURL(/.*cart.html/);
    
    await page.locator('button:has-text("Checkout")').click();
    await page.waitForURL(/.*checkout-step-one.html/);
    
    // Fill form
    await page.locator('input[data-test="firstName"]').fill('John');
    await page.locator('input[data-test="lastName"]').fill('Doe');
    await page.locator('input[data-test="postalCode"]').fill('12345');
    await page.locator('button:has-text("Continue")').click();
    await page.waitForURL(/.*checkout-step-two.html/);
    
    // Click cancel on step two
    const cancelButton = page.locator('button').filter({ hasText: 'Cancel' });
    await cancelButton.click();
    
    // Verify return to cart
    await page.waitForURL(/.*cart.html/);
    await expect(page).toHaveURL(/.*cart.html/);
  });

  test('Continue Shopping from Cart', async ({ page }) => {
    // Login and navigate to cart
    await page.goto('https://www.saucedemo.com');
    await page.locator('input[name="user-name"]').fill('standard_user');
    await page.locator('input[name="password"]').fill('secret_sauce');
    await page.locator('input#login-button').click();
    await page.waitForURL(/.*inventory.html/);
    
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('a.shopping_cart_link').click();
    await page.waitForURL(/.*cart.html/);
    
    // Click continue shopping
    const continueButton = page.locator('button').filter({ hasText: 'Continue Shopping' });
    await continueButton.click();
    
    // Verify return to inventory
    await page.waitForURL(/.*inventory.html/);
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('Back Home from Confirmation Page', async ({ page }) => {
    // Complete a full checkout
    await page.goto('https://www.saucedemo.com');
    await page.locator('input[name="user-name"]').fill('standard_user');
    await page.locator('input[name="password"]').fill('secret_sauce');
    await page.locator('input#login-button').click();
    await page.waitForURL(/.*inventory.html/);
    
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('a.shopping_cart_link').click();
    await page.waitForURL(/.*cart.html/);
    
    await page.locator('button:has-text("Checkout")').click();
    await page.waitForURL(/.*checkout-step-one.html/);
    
    await page.locator('input[data-test="firstName"]').fill('John');
    await page.locator('input[data-test="lastName"]').fill('Doe');
    await page.locator('input[data-test="postalCode"]').fill('12345');
    await page.locator('button:has-text("Continue")').click();
    
    await page.waitForURL(/.*checkout-step-two.html/);
    await page.locator('button:has-text("Finish")').click();
    await page.waitForURL(/.*checkout-complete.html/);
    
    // Click back home
    await page.locator('button:has-text("Back Home")').click();
    
    // Verify return to inventory
    await page.waitForURL(/.*inventory.html/);
    await expect(page).toHaveURL(/.*inventory.html/);
  });
});
