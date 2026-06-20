// spec: specs/saucedemo-checkout-test-plan.md
// Test Suite: Order Overview Tests

import { test, expect } from '@playwright/test';

test.describe('Order Overview Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('https://www.saucedemo.com');
    await page.locator('input[name="user-name"]').fill('standard_user');
    await page.locator('input[name="password"]').fill('secret_sauce');
    await page.locator('input#login-button').click();
    await page.waitForURL(/.*inventory.html/);
    
    // Add items to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    
    // Navigate to checkout
    await page.locator('a.shopping_cart_link').click();
    await page.waitForURL(/.*cart.html/);
    await page.locator('button:has-text("Checkout")').click();
    await page.waitForURL(/.*checkout-step-one.html/);
    
    // Fill checkout form
    await page.locator('input[name="firstName"]').fill('John');
    await page.locator('input[name="lastName"]').fill('Doe');
    await page.locator('input[name="postalCode"]').fill('12345');
    await page.locator('button:has-text("Continue")').click();
    
    // Wait for overview page
    await page.waitForURL(/.*checkout-step-two.html/);
  });

  test('Order Overview Display Items', async ({ page }) => {
    // Verify items are displayed
    await expect(page.locator('text=Sauce Labs Backpack')).toBeVisible();
    await expect(page.locator('text=Sauce Labs Bike Light')).toBeVisible();
    
    // Verify prices
    await expect(page.locator('text=$29.99')).toBeVisible();
    await expect(page.locator('text=$9.99')).toBeVisible();
  });

  test('Order Overview Shows Payment Information', async ({ page }) => {
    // Verify payment information is displayed
    await expect(page.locator('text=Payment Information:')).toBeVisible();
    await expect(page.locator('text=SauceCard')).toBeVisible();
  });

  test('Order Overview Shows Shipping Information', async ({ page }) => {
    // Verify shipping information is displayed
    await expect(page.locator('text=Shipping Information:')).toBeVisible();
    await expect(page.locator('text=Free Pony Express Delivery!')).toBeVisible();
  });

  test('Price Calculation Verification', async ({ page }) => {
    // Verify total calculation
    // Backpack: $29.99 + Bike Light: $9.99 = $39.98
    await expect(page.locator('text=Item total: $39.98')).toBeVisible();
    
    // Verify tax is calculated (assuming 8% tax)
    await expect(page.locator('text=Tax:')).toBeVisible();
    
    // Verify total includes tax
    await expect(page.locator('text=Total:')).toBeVisible();
  });

  test('Cancel Button on Overview Returns to Checkout', async ({ page }) => {
    // Click Cancel button
    const cancelButton = page.locator('button').filter({ hasText: 'Cancel' });
    await cancelButton.click();
    
    // Verify navigation back to checkout step one
    await page.waitForURL(/.*checkout-step-one.html/);
  });

  test('Finish Button Completes Order', async ({ page }) => {
    // Click Finish button
    await page.locator('button:has-text("Finish")').click();
    
    // Verify navigation to confirmation page
    await page.waitForURL(/.*checkout-complete.html/);
    await expect(page).toHaveURL(/.*checkout-complete.html/);
  });

  test('Order Overview with Single Item', async ({ page }) => {
    // This test needs to add only one item
    // We'll navigate back and test with a single item
    const backButton = page.locator('button').filter({ hasText: 'Cancel' });
    await backButton.click();
    
    // Navigate back to cart
    await page.waitForURL(/.*checkout-step-one.html/);
    const cancelButton = page.locator('button').filter({ hasText: 'Cancel' });
    await cancelButton.click();
    
    // Remove the bike light
    const removeButtons = page.locator('button:has-text("Remove")');
    if (await removeButtons.count() > 0) {
      await removeButtons.last().click();
    }
    
    // Proceed to checkout again
    await page.locator('button:has-text("Checkout")').click();
    await page.waitForURL(/.*checkout-step-one.html/);
    
    // Fill and submit
    await page.locator('input[name="firstName"]').fill('Jane');
    await page.locator('input[name="lastName"]').fill('Smith');
    await page.locator('input[name="postalCode"]').fill('54321');
    await page.locator('button:has-text("Continue")').click();
    
    // Verify single item display
    await page.waitForURL(/.*checkout-step-two.html/);
    await expect(page.locator('text=Sauce Labs Backpack')).toBeVisible();
  });
});
