# Bon-Bonite Web Automation

Automation project for the Bon-Bonite e-commerce website, developed as part of the QA Automation technical challenge.

The project validates critical user journeys using Playwright, TypeScript, Cucumber and BDD.

## Application Under Test

- Website: https://www.bon-bonite.com/
- Automation approach: End-to-End testing
- Language: TypeScript
- Framework: Playwright
- BDD: Cucumber
- Architecture: Page Object Model (POM)

---

## Scope

The current automation covers the following critical business flows:

### 1. User Registration

Validates that a new user can:

- Access the registration form.
- Enter valid personal information.
- Accept the personal data treatment authorization.
- Complete the registration.
- Be redirected to the authenticated account area.

### 2. Personal Data Update

Validates that a registered user can:

- Access the personal data section.
- Open the update form.
- Modify personal information.
- Save the changes.
- Receive the confirmation message.

### 3. Product Purchase

Validates the complete purchase journey:

- Register a new user.
- Open the products menu.
- Navigate to Shoes.
- Navigate to Boots and Booties.
- Select a product.
- Detect an available product size.
- Add the product to the shopping cart.
- Open the cart.
- Start checkout.
- Complete the required shipping information.
- Accept the terms and conditions.
- Register the order.
- Validate the successful order confirmation.

## Installation

### 1. Clone the repository

```bash
git clone <REPOSITORY_URL>
```
### 2. Navigate to the project and install dependencies

```bash
cd q-vision-web-automation
npm install
npx playwright install
```
### 3. Configure environment variables

Create a .env file in the project root:
```bash
BASE_URL=https://www.bon-bonite.com
HEADLESS=false
```
Use HEADLESS=false to run the tests with the browser visible.

## Test execution
## Test Execution

**Important:** The test scenarios must be executed individually.
Running multiple scenarios in the same execution may cause conflicts because the registration flow creates a new user account using the test data.

### 1. Registration
```bash
npm run test:registration
```
Validates the user registration flow.

### 2. User data update
```bash
npm run test:account
```
Validates the modification of registered user information.

### 3. Purchase
```bash
npm run test:purchase
```
Validates the purchase flow from registration through order confirmation.