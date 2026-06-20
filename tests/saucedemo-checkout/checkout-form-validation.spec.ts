// spec: specs/saucedemo-checkout-test-plan.md
// Test Suite: Checkout Form Validation Tests

import { test, expect } from '@playwright/test';

test.describe('Checkout Form Validation Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Login and add items to cart
    await page.goto('https://www.saucedemo.com');
    await page.locator('input[name="user-name"]').fill('standard_user');
    await page.locator('input[name="password"]').fill('secret_sauce');
    await page.locator('input#login-button').click();
    await page.waitForURL(/.*inventory.html/);
    
    // Add item to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    
    // Navigate to checkout form
    await page.locator('a.shopping_cart_link').click();
    await page.waitForURL(/.*cart.html/);
    await page.locator('button:has-text("Checkout")').click();
    await page.waitForURL(/.*checkout-step-one.html/);
  });

  test('First Name Required Validation', async ({ page }) => {
    // Leave First Name empty and try to continue
    await page.locator('input[name="lastName"]').fill('Doe');
    await page.locator('input[name="postalCode"]').fill('12345');
    await page.locator('button:has-text("Continue")').click();
    
    // Verify error message appears
    await expect(page.locator('text=Error: First Name is required')).toBeVisible();
  });

  test('Last Name Required Validation', async ({ page }) => {
    // Fill First Name and Zip but not Last Name
    await page.locator('input[name="firstName"]').fill('John');
    await page.locator('input[name="postalCode"]').fill('12345');
    await page.locator('button:has-text("Continue")').click();
    
    // Verify error message appears
    await expect(page.locator('text=Error: Last Name is required')).toBeVisible();
  });

  test('Zip Code Required Validation', async ({ page }) => {
    // Fill First and Last Name but not Zip Code
    await page.locator('input[name="firstName"]').fill('John');
    await page.locator('input[name="lastName"]').fill('Doe');
    await page.locator('button:has-text("Continue")').click();
    
    // Verify error message appears
    await expect(page.locator('text=Error: Postal Code is required')).toBeVisible();
  });

  test('Form Accepts Valid Data', async ({ page }) => {
    // Fill all fields with valid data
    await page.locator('input[name="firstName"]').fill('John');
    await page.locator('input[name="lastName"]').fill('Doe');
    await page.locator('input[name="postalCode"]').fill('12345');
    
    // Verify form fields have correct values
    await expect(page.locator('input[name="firstName"]')).toHaveValue('John');
    await expect(page.locator('input[name="lastName"]')).toHaveValue('Doe');
    await expect(page.locator('input[name="postalCode"]')).toHaveValue('12345');
    
    // Click continue
    await page.locator('button:has-text("Continue")').click();
    
    // Verify navigation to order overview
    await page.waitForURL(/.*checkout-step-two.html/);
    await expect(page).toHaveURL(/.*checkout-step-two.html/);
  });

  test('Form with Special Characters', async ({ page }) => {
    // Fill form with special characters
    await page.locator('input[name="firstName"]').fill('Jo@hn!');
    await page.locator('input[name="lastName"]').fill('D-o-e');
    await page.locator('input[name="postalCode"]').fill('123-45');
    
    // Verify fields accept the input
    await expect(page.locator('input[name="firstName"]')).toHaveValue('Jo@hn!');
    await expect(page.locator('input[name="lastName"]')).toHaveValue('D-o-e');
    await expect(page.locator('input[name="postalCode"]')).toHaveValue('123-45');
  });

  test('Error Clears When Field is Filled', async ({ page }) => {
    // Try to continue with empty form
    await page.locator('button:has-text("Continue")').click();
    
    // Verify error appears
    await expect(page.locator('text=Error: First Name is required')).toBeVisible();
    
    // Fill the First Name field
    await page.locator('input[name="firstName"]').fill('John');
    
    // Wait a moment for error to clear
    await page.waitForTimeout(300);
    
    // Fill other fields
    await page.locator('input[name="lastName"]').fill('Doe');
    await page.locator('input[name="postalCode"]').fill('12345');
    
    // Try to continue again
    await page.locator('button:has-text("Continue")').click();
    
    // Should navigate to next page without error
    await page.waitForURL(/.*checkout-step-two.html/);
  });

  test('Cancel Button Returns to Cart', async ({ page }) => {
    // Click Cancel button
    const cancelButton = page.locator('button').filter({ hasText: 'Cancel' });
    await cancelButton.click();
    
    // Verify navigation back to cart
    await page.waitForURL(/.*cart.html/);
    await expect(page).toHaveURL(/.*cart.html/);
  });

  test('Long Name Input Handling', async ({ page }) => {
    // Fill form with very long names
    const longName = 'A'.repeat(100);
    await page.locator('input[name="firstName"]').fill(longName);
    await page.locator('input[name="lastName"]').fill(longName);
    await page.locator('input[name="postalCode"]').fill('12345');
    
    // Verify form accepts long input
    const firstNameValue = await page.locator('input[name="firstName"]').inputValue();
    expect(firstNameValue).toBeTruthy();
  });
});
