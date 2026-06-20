# SauceDemo E-commerce Checkout Process Test Plan

## Application Overview

This comprehensive test plan covers the SauceDemo e-commerce checkout process (https://www.saucedemo.com). The test suite validates all acceptance criteria including cart review, checkout information capture, order overview, order completion, and error handling. Tests cover happy path scenarios, validation rules, navigation flows, edge cases, and error states across the entire checkout journey from login through order confirmation.

## Test Scenarios

### 1. Cart Review Tests

**Seed:** `tests/seed.spec.ts`

#### 1.1. TC001 - Display cart with single item

**File:** `tests/checkout/cart/TC001-single-item-cart.spec.ts`

**Steps:**
  1. -
    - expect: User is logged in and on inventory page with products displayed
  2. Add Sauce Labs Backpack to cart
    - expect: Backpack is added to cart, cart badge shows '1'
  3. Navigate to cart page
    - expect: Cart page displays with title 'Your Cart'
  4. Verify cart content displays correctly
    - expect: Cart shows 1 item with quantity '1'
    - expect: Item name 'Sauce Labs Backpack' is displayed
    - expect: Item description is visible
    - expect: Item price '$29.99' is displayed
    - expect: Remove button is present for the item
  5. Verify cart page buttons and navigation
    - expect: 'Continue Shopping' button is visible and clickable
    - expect: 'Checkout' button is visible and clickable

#### 1.2. TC002 - Display cart with multiple items

**File:** `tests/checkout/cart/TC002-multiple-items-cart.spec.ts`

**Steps:**
  1. -
    - expect: User is logged in and on inventory page
  2. Add Sauce Labs Backpack to cart
    - expect: Backpack added, cart badge shows '1'
  3. Add Sauce Labs Bike Light to cart
    - expect: Bike Light added, cart badge shows '2'
  4. Add Sauce Labs Bolt T-Shirt to cart
    - expect: T-Shirt added, cart badge shows '3'
  5. Navigate to cart page
    - expect: Cart page displays with title 'Your Cart'
  6. Verify all items are displayed
    - expect: Cart displays 3 items
    - expect: Item 1: Sauce Labs Backpack with quantity 1, price $29.99
    - expect: Item 2: Sauce Labs Bike Light with quantity 1, price $9.99
    - expect: Item 3: Sauce Labs Bolt T-Shirt with quantity 1, price $15.99
    - expect: Each item has a description and Remove button

#### 1.3. TC003 - Remove item from cart

**File:** `tests/checkout/cart/TC003-remove-item-from-cart.spec.ts`

**Steps:**
  1. -
    - expect: User has 3 items in cart on cart page
  2. Click Remove button for Sauce Labs Backpack
    - expect: Backpack is removed from cart
    - expect: Cart badge updates to '2'
    - expect: Only 2 items remain in cart
  3. Click Remove button for Sauce Labs Bike Light
    - expect: Bike Light is removed from cart
    - expect: Cart badge updates to '1'
    - expect: Only Sauce Labs Bolt T-Shirt remains

#### 1.4. TC004 - Continue shopping from cart

**File:** `tests/checkout/cart/TC004-continue-shopping.spec.ts`

**Steps:**
  1. -
    - expect: User is on cart page with items in cart
  2. Click 'Continue Shopping' button
    - expect: User returns to inventory page
    - expect: Products are displayed
    - expect: Cart badge still shows number of items

#### 1.5. TC005 - View cart with various product prices

**File:** `tests/checkout/cart/TC005-various-prices.spec.ts`

**Steps:**
  1. -
    - expect: User is on inventory page
  2. Add Sauce Labs Onesie ($7.99) to cart
    - expect: Onesie added to cart
  3. Add Sauce Labs Fleece Jacket ($49.99) to cart
    - expect: Fleece Jacket added to cart
  4. Navigate to cart page
    - expect: Cart displays both items with correct prices
    - expect: $7.99 for Sauce Labs Onesie
    - expect: $49.99 for Sauce Labs Fleece Jacket

### 2. Checkout Information Tests

**Seed:** `tests/seed.spec.ts`

#### 2.1. TC006 - Happy path checkout with valid data

**File:** `tests/checkout/information/TC006-happy-path.spec.ts`

**Steps:**
  1. -
    - expect: User has items in cart and is on checkout page (step one)
  2. Verify checkout form displays correctly
    - expect: Form title shows 'Checkout: Your Information'
    - expect: First Name field is displayed
    - expect: Last Name field is displayed
    - expect: Zip/Postal Code field is displayed
    - expect: Cancel button is visible
    - expect: Continue button is visible
  3. Enter valid first name 'John' in First Name field
    - expect: First Name field contains 'John'
  4. Enter valid last name 'Doe' in Last Name field
    - expect: Last Name field contains 'Doe'
  5. Enter valid postal code '12345' in Zip/Postal Code field
    - expect: Zip/Postal Code field contains '12345'
  6. Click Continue button
    - expect: Form is submitted successfully
    - expect: Page navigates to checkout step two (overview page)
    - expect: Order summary is displayed

#### 2.2. TC007 - Validation error when First Name is empty

**File:** `tests/checkout/information/TC007-first-name-required.spec.ts`

**Steps:**
  1. -
    - expect: User is on checkout information page with empty form
  2. Click Continue button without entering any data
    - expect: Error message appears: 'Error: First Name is required'
    - expect: Error message is displayed as a heading
    - expect: Form remains on same page
    - expect: All fields are still empty

#### 2.3. TC008 - Validation error when Last Name is empty

**File:** `tests/checkout/information/TC008-last-name-required.spec.ts`

**Steps:**
  1. -
    - expect: User is on checkout information page
  2. Enter first name 'Jane' in First Name field
    - expect: First Name field contains 'Jane'
  3. Leave Last Name field empty and click Continue
    - expect: Error message appears: 'Error: Last Name is required'
    - expect: Page remains on checkout information page
    - expect: First Name field retains value 'Jane'

#### 2.4. TC009 - Validation error when Postal Code is empty

**File:** `tests/checkout/information/TC009-postal-code-required.spec.ts`

**Steps:**
  1. -
    - expect: User is on checkout information page
  2. Enter first name 'Alice' and last name 'Johnson'
    - expect: Both fields are filled
  3. Leave Postal Code field empty and click Continue
    - expect: Error message appears: 'Error: Postal Code is required'
    - expect: Page remains on checkout information page
    - expect: First and last name fields retain values

#### 2.5. TC010 - Form accepts special characters in name fields

**File:** `tests/checkout/information/TC010-special-chars-in-names.spec.ts`

**Steps:**
  1. -
    - expect: User is on checkout information page
  2. Enter first name with hyphen 'Jean-Paul' in First Name field
    - expect: First Name field contains 'Jean-Paul'
  3. Enter last name with apostrophe "O'Brien" in Last Name field
    - expect: Last Name field contains "O'Brien"
  4. Enter postal code '90210' in Zip/Postal Code field
    - expect: Postal Code field contains '90210'
  5. Click Continue button
    - expect: Form accepts special characters
    - expect: Page navigates to checkout overview

#### 2.6. TC011 - Form accepts numeric first and last names

**File:** `tests/checkout/information/TC011-numeric-names.spec.ts`

**Steps:**
  1. -
    - expect: User is on checkout information page
  2. Enter first name '123' in First Name field
    - expect: First Name field contains '123'
  3. Enter last name '456' in Last Name field
    - expect: Last Name field contains '456'
  4. Enter postal code '99999' in Zip/Postal Code field
    - expect: Postal Code field contains '99999'
  5. Click Continue button
    - expect: Form accepts numeric names
    - expect: Page navigates to checkout overview

#### 2.7. TC012 - Form accepts long name inputs

**File:** `tests/checkout/information/TC012-long-names.spec.ts`

**Steps:**
  1. -
    - expect: User is on checkout information page
  2. Enter long first name (50+ characters) 'Christopher Alexander Michael Benjamin Jonathan Robert' in First Name field
    - expect: First Name field accepts long input
  3. Enter long last name (50+ characters) 'Schwarzenegger-Johannesburgensenius-Constantineopolitan'
    - expect: Last Name field accepts long input
  4. Enter postal code '12345' in Zip/Postal Code field
    - expect: Postal Code field contains '12345'
  5. Click Continue button
    - expect: Form submits with long names successfully

#### 2.8. TC013 - Form accepts numeric postal codes

**File:** `tests/checkout/information/TC013-numeric-postal-codes.spec.ts`

**Steps:**
  1. -
    - expect: User is on checkout information page
  2. Enter first name 'Test' and last name 'User'
    - expect: Name fields are filled
  3. Enter postal code '0' (single digit) in Zip/Postal Code field
    - expect: Postal Code field contains '0'
  4. Click Continue button
    - expect: Form accepts single digit postal code
  5. Go back to checkout information page
    - expect: User navigates back to step one
  6. Clear postal code and enter very long postal code '123456789012345'
    - expect: Postal Code field accepts long numeric code
  7. Click Continue button
    - expect: Form accepts long postal code

#### 2.9. TC014 - Cancel button returns to cart

**File:** `tests/checkout/information/TC014-cancel-checkout.spec.ts`

**Steps:**
  1. -
    - expect: User is on checkout information page
  2. Click Cancel button
    - expect: User is returned to cart page
    - expect: Cart page displays 'Your Cart' title
    - expect: All previously added items are still in cart

#### 2.10. TC015 - Whitespace in form fields

**File:** `tests/checkout/information/TC015-whitespace-handling.spec.ts`

**Steps:**
  1. -
    - expect: User is on checkout information page
  2. Enter first name with leading/trailing spaces '  John  '
    - expect: First Name field displays the input
  3. Enter last name with internal spaces 'Van Der Berg'
    - expect: Last Name field displays the input
  4. Enter postal code with spaces '12 345' or similar
    - expect: Postal Code field accepts spaces
  5. Click Continue button
    - expect: Form submission handles whitespace appropriately

### 3. Order Overview Tests

**Seed:** `tests/seed.spec.ts`

#### 3.1. TC016 - Display order overview with items

**File:** `tests/checkout/overview/TC016-order-overview-display.spec.ts`

**Steps:**
  1. -
    - expect: User has completed checkout information step and is on overview page
  2. Verify overview page title displays 'Checkout: Overview'
    - expect: Title 'Checkout: Overview' is visible
  3. Verify order summary section displays
    - expect: Order summary table with QTY and Description columns
    - expect: All 3 added items are displayed
    - expect: Each item shows correct quantity (1 each)
    - expect: Each item shows correct name and description
    - expect: Each item shows correct price

#### 3.2. TC017 - Verify payment information section

**File:** `tests/checkout/overview/TC017-payment-information.spec.ts`

**Steps:**
  1. -
    - expect: User is on checkout overview page
  2. Verify payment information section
    - expect: Payment Information label is displayed
    - expect: Payment method 'SauceCard #31337' is shown
    - expect: Payment details are clearly visible

#### 3.3. TC018 - Verify shipping information section

**File:** `tests/checkout/overview/TC018-shipping-information.spec.ts`

**Steps:**
  1. -
    - expect: User is on checkout overview page
  2. Verify shipping information section
    - expect: Shipping Information label is displayed
    - expect: Shipping method 'Free Pony Express Delivery!' is shown

#### 3.4. TC019 - Verify price calculation

**File:** `tests/checkout/overview/TC019-price-calculation.spec.ts`

**Steps:**
  1. -
    - expect: User has 3 items in cart: Backpack ($29.99), Bike Light ($9.99), T-Shirt ($15.99)
  2. Navigate to checkout overview page
    - expect: Overview page displays
  3. Verify price summary section
    - expect: Item total: $55.97 (sum of all item prices)
    - expect: Tax: $4.48 (calculated tax)
    - expect: Total: $60.45 (item total + tax)
    - expect: All prices displayed with proper currency format

#### 3.5. TC020 - Verify price calculation with different items

**File:** `tests/checkout/overview/TC020-price-calculation-varied-items.spec.ts`

**Steps:**
  1. -
    - expect: User is on inventory page
  2. Clear cart and add Sauce Labs Onesie ($7.99) and Sauce Labs Fleece Jacket ($49.99)
    - expect: 2 items added to cart
  3. Complete checkout information step
    - expect: User reaches overview page
  4. Verify price calculations
    - expect: Item total: $57.98
    - expect: Tax is calculated correctly
    - expect: Total shows correct sum

#### 3.6. TC021 - Cancel from overview returns to cart

**File:** `tests/checkout/overview/TC021-cancel-from-overview.spec.ts`

**Steps:**
  1. -
    - expect: User is on checkout overview page
  2. Click Cancel button
    - expect: User returns to cart page
    - expect: Cart page displays with all items still present

#### 3.7. TC022 - Finish button submits order

**File:** `tests/checkout/overview/TC022-finish-order.spec.ts`

**Steps:**
  1. -
    - expect: User is on checkout overview page with complete order information
  2. Click Finish button
    - expect: Form is submitted
    - expect: Page navigates to order completion page

#### 3.8. TC023 - Overview displays user information

**File:** `tests/checkout/overview/TC023-user-info-on-overview.spec.ts`

**Steps:**
  1. -
    - expect: User entered 'John' as first name, 'Doe' as last name, '12345' as postal code
  2. Verify overview page displays shipping address/user information
    - expect: User name or address information is displayed
    - expect: User information matches what was entered

### 4. Order Completion Tests

**Seed:** `tests/seed.spec.ts`

#### 4.1. TC024 - Display order completion success page

**File:** `tests/checkout/completion/TC024-success-page.spec.ts`

**Steps:**
  1. -
    - expect: User has completed all checkout steps and clicked Finish button
  2. Verify order completion page displays
    - expect: Page URL is 'checkout-complete.html'
    - expect: Page title shows 'Checkout: Complete!'
  3. Verify success message is displayed
    - expect: Heading 'Thank you for your order!' is displayed
    - expect: Confirmation message shows 'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
    - expect: Pony Express delivery image is displayed

#### 4.2. TC025 - Back Home button on completion page

**File:** `tests/checkout/completion/TC025-back-home-button.spec.ts`

**Steps:**
  1. -
    - expect: User is on order completion page
  2. Verify Back Home button is present and clickable
    - expect: 'Back Home' button is displayed
  3. Click Back Home button
    - expect: User is redirected to inventory page
    - expect: Products are displayed
    - expect: Cart is empty (badge should be removed or show 0)

#### 4.3. TC026 - Complete checkout with different user data

**File:** `tests/checkout/completion/TC026-complete-checkout-alt-user.spec.ts`

**Steps:**
  1. -
    - expect: User is on inventory page
  2. Add single item to cart
    - expect: Item added
  3. Navigate to cart and checkout
    - expect: User on checkout step one
  4. Enter different user data: First Name 'Alice', Last Name 'Wonder', Postal Code '98765'
    - expect: Form populated with different user data
  5. Complete checkout flow and finish order
    - expect: Order completion page displays
    - expect: Success message shown with 'Thank you for your order!'

#### 4.4. TC027 - Verify cart is cleared after order completion

**File:** `tests/checkout/completion/TC027-cart-cleared-after-order.spec.ts`

**Steps:**
  1. -
    - expect: User has completed an order on the completion page
  2. Click Back Home button
    - expect: User returns to inventory page
  3. Verify cart is empty
    - expect: Cart badge is not displayed or shows empty state
    - expect: Cart is ready for new items to be added

#### 4.5. TC028 - Multiple sequential checkouts

**File:** `tests/checkout/completion/TC028-multiple-checkouts.spec.ts`

**Steps:**
  1. -
    - expect: User is on inventory page after previous checkout
  2. Complete first order with Backpack, navigate to completion, click Back Home
    - expect: User on inventory page with empty cart
  3. Add different items to cart (Bike Light, T-Shirt)
    - expect: New items added to cart
  4. Complete checkout with new data and verify success
    - expect: Second order completes successfully
    - expect: Completion page displays
    - expect: Cart clears after completing second order

### 5. Navigation and Flow Tests

**Seed:** `tests/seed.spec.ts`

#### 5.1. TC029 - Navigation from inventory to checkout flow

**File:** `tests/checkout/navigation/TC029-full-flow-navigation.spec.ts`

**Steps:**
  1. -
    - expect: User is logged in on inventory page
  2. Add multiple items to cart
    - expect: Items added, cart badge updated
  3. Navigate to cart page
    - expect: Cart page displays
  4. Click Checkout button
    - expect: Navigate to checkout step one
  5. Fill form and click Continue
    - expect: Navigate to checkout step two (overview)
  6. Click Finish button
    - expect: Navigate to order completion page
  7. Click Back Home button
    - expect: Navigate back to inventory page

#### 5.2. TC030 - Cancel from checkout step one returns to cart

**File:** `tests/checkout/navigation/TC030-cancel-from-step-one.spec.ts`

**Steps:**
  1. -
    - expect: User is on checkout step one
  2. Click Cancel button
    - expect: User returns to cart page with items intact

#### 5.3. TC031 - Cancel from checkout step two returns to cart

**File:** `tests/checkout/navigation/TC031-cancel-from-step-two.spec.ts`

**Steps:**
  1. -
    - expect: User is on checkout overview page
  2. Click Cancel button
    - expect: User returns to cart page with items intact

#### 5.4. TC032 - Back button in continue shopping maintains cart

**File:** `tests/checkout/navigation/TC032-shopping-maintains-cart.spec.ts`

**Steps:**
  1. -
    - expect: User has items in cart
  2. Navigate to cart page
    - expect: Cart shows items
  3. Click Continue Shopping button
    - expect: User returns to inventory page
  4. Navigate back to cart
    - expect: All items still in cart
    - expect: Quantities and prices unchanged

#### 5.5. TC033 - Direct URL navigation to checkout pages

**File:** `tests/checkout/navigation/TC033-direct-url-navigation.spec.ts`

**Steps:**
  1. -
    - expect: User is logged in
  2. Navigate directly to checkout-step-one.html URL
    - expect: User can access checkout step one directly
  3. Fill form and click Continue
    - expect: Page navigates to step two
  4. Navigate directly to checkout-complete.html URL
    - expect: Order completion page is accessible

### 6. Edge Cases and Boundary Tests

**Seed:** `tests/seed.spec.ts`

#### 6.1. TC034 - Very long first and last names

**File:** `tests/checkout/edge-cases/TC034-very-long-names.spec.ts`

**Steps:**
  1. -
    - expect: User is on checkout information page
  2. Enter very long first name (100+ characters)
    - expect: Field accepts long input
  3. Enter very long last name (100+ characters)
    - expect: Field accepts long input
  4. Enter postal code and submit
    - expect: Form submits successfully
    - expect: Long names are retained in system

#### 6.2. TC035 - Special characters and symbols in names

**File:** `tests/checkout/edge-cases/TC035-special-chars-symbols.spec.ts`

**Steps:**
  1. -
    - expect: User is on checkout information page
  2. Enter first name with symbols '@#$%^&*()'
    - expect: Field accepts special characters
  3. Enter last name with extended characters 'Müller-König'
    - expect: Field accepts extended/unicode characters
  4. Enter postal code and submit
    - expect: Form accepts special characters

#### 6.3. TC036 - Single character name fields

**File:** `tests/checkout/edge-cases/TC036-single-char-names.spec.ts`

**Steps:**
  1. -
    - expect: User is on checkout information page
  2. Enter single character 'A' as first name
    - expect: First name accepts single character
  3. Enter single character 'Z' as last name
    - expect: Last name accepts single character
  4. Enter single digit '1' as postal code
    - expect: Postal code accepts single digit
  5. Submit form
    - expect: Form submits with minimal data

#### 6.4. TC037 - Maximum length postal code

**File:** `tests/checkout/edge-cases/TC037-max-postal-code.spec.ts`

**Steps:**
  1. -
    - expect: User is on checkout information page
  2. Enter names and very long postal code (50+ digits)
    - expect: Field accepts long postal code
  3. Submit form
    - expect: Form submits with long postal code

#### 6.5. TC038 - Cart with single low-price item

**File:** `tests/checkout/edge-cases/TC038-low-price-item.spec.ts`

**Steps:**
  1. -
    - expect: User on inventory page
  2. Add only Sauce Labs Onesie ($7.99) to cart
    - expect: Item added
  3. Complete checkout flow
    - expect: Overview shows correct subtotal $7.99
    - expect: Tax calculated on $7.99
    - expect: Total correctly computed

#### 6.6. TC039 - Cart with single high-price item

**File:** `tests/checkout/edge-cases/TC039-high-price-item.spec.ts`

**Steps:**
  1. -
    - expect: User on inventory page
  2. Add only Sauce Labs Fleece Jacket ($49.99) to cart
    - expect: Item added
  3. Complete checkout flow
    - expect: Overview shows correct subtotal $49.99
    - expect: Tax calculated accurately
    - expect: Total correctly computed

#### 6.7. TC040 - Postal code with letters (if allowed)

**File:** `tests/checkout/edge-cases/TC040-postal-code-with-letters.spec.ts`

**Steps:**
  1. -
    - expect: User is on checkout information page
  2. Enter first name and last name
    - expect: Name fields filled
  3. Enter postal code with letters 'SW1A1AA' (UK format)
    - expect: Postal code field accepts alphanumeric input
  4. Click Continue
    - expect: Form accepts or rejects alphanumeric postal codes
    - expect: Behavior is consistent

### 7. Error Handling and Validation Tests

**Seed:** `tests/seed.spec.ts`

#### 7.1. TC041 - Error message display for missing first name

**File:** `tests/checkout/error-handling/TC041-first-name-error.spec.ts`

**Steps:**
  1. -
    - expect: User is on checkout information page with empty form
  2. Click Continue without entering any data
    - expect: Error message displayed: 'Error: First Name is required'
    - expect: Error appears as a heading element
    - expect: Error message is prominent and visible
    - expect: Error icon visible next to First Name field

#### 7.2. TC042 - Error message cleared when field is filled

**File:** `tests/checkout/error-handling/TC042-error-cleared-on-input.spec.ts`

**Steps:**
  1. -
    - expect: User has submitted form and sees 'First Name is required' error
  2. Enter a value in First Name field
    - expect: Error message for first name disappears
    - expect: Error icon removed from first name field

#### 7.3. TC043 - Error messages for all three missing fields

**File:** `tests/checkout/error-handling/TC043-all-fields-error.spec.ts`

**Steps:**
  1. -
    - expect: User is on checkout information page with all fields empty
  2. Click Continue button
    - expect: Error shows for First Name field
    - expect: Red error indicators visible for all three fields
  3. Fill only First Name and click Continue
    - expect: Error now shows for Last Name
  4. Fill First Name and Last Name, click Continue
    - expect: Error now shows for Postal Code

#### 7.4. TC044 - Sequential field validation

**File:** `tests/checkout/error-handling/TC044-sequential-validation.spec.ts`

**Steps:**
  1. -
    - expect: User on empty checkout form
  2. Click Continue with all fields empty
    - expect: First Name error appears
  3. Enter first name and click Continue
    - expect: Last Name error appears
  4. Enter last name and click Continue
    - expect: Postal Code error appears
  5. Enter postal code and click Continue
    - expect: No errors, form submits successfully

#### 7.5. TC045 - Error message persistence during navigation

**File:** `tests/checkout/error-handling/TC045-error-persistence.spec.ts`

**Steps:**
  1. -
    - expect: User has triggered validation error on checkout form
  2. Verify error message remains visible
    - expect: Error message persists on page
  3. Try clicking Continue multiple times
    - expect: Error message remains until field is filled

#### 7.6. TC046 - Whitespace-only first name (if treated as empty)

**File:** `tests/checkout/error-handling/TC046-whitespace-only-name.spec.ts`

**Steps:**
  1. -
    - expect: User is on checkout information page
  2. Enter only spaces '     ' in First Name field
    - expect: Field contains spaces
  3. Fill other fields and click Continue
    - expect: System either accepts spaces or treats as empty
    - expect: Error handling is consistent

### 8. Multiple Products and Variations Tests

**Seed:** `tests/seed.spec.ts`

#### 8.1. TC047 - Checkout with all available products

**File:** `tests/checkout/products/TC047-all-products.spec.ts`

**Steps:**
  1. -
    - expect: User on inventory page with all 6 products available
  2. Add all 6 products to cart
    - expect: All products added, cart badge shows '6'
  3. Navigate to cart
    - expect: Cart displays all 6 items
    - expect: All items have correct names and prices
  4. Complete checkout with valid information
    - expect: Overview displays all 6 items
    - expect: Price calculation includes all items
    - expect: Order completes successfully

#### 8.2. TC048 - Checkout with minimum items (1 item)

**File:** `tests/checkout/products/TC048-single-item.spec.ts`

**Steps:**
  1. -
    - expect: User on inventory page
  2. Add only one item (Sauce Labs Bolt T-Shirt) to cart
    - expect: Item added, cart badge shows '1'
  3. Complete full checkout flow
    - expect: Cart displays 1 item
    - expect: Overview shows 1 item
    - expect: Order completes with single item

#### 8.3. TC049 - Verify each product displays correct price

**File:** `tests/checkout/products/TC049-product-prices.spec.ts`

**Steps:**
  1. -
    - expect: User on inventory page
  2. Add each product individually and verify price in cart
    - expect: Sauce Labs Backpack: $29.99
    - expect: Sauce Labs Bike Light: $9.99
    - expect: Sauce Labs Bolt T-Shirt: $15.99
    - expect: Sauce Labs Fleece Jacket: $49.99
    - expect: Sauce Labs Onesie: $7.99
    - expect: Test.allTheThings() T-Shirt (Red): $15.99
