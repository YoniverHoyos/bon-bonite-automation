import { Given, When, Then } from '@cucumber/cucumber';
import { page } from '../support/hooks';
import { RegisterPage } from '../pages/RegisterPage';
import { env } from '../config/env';
import { testUser } from '../test-data/users';

Given('the user is on the registration page', async () => {
  await page.goto(`${env.baseUrl}/mi-cuenta/`, {
    waitUntil: 'domcontentloaded',
    timeout: 15000,
  });

  const registerPage = new RegisterPage(page);

  await registerPage.navigateToRegistration();
  await registerPage.verifyRegistrationPage();
});

When('the user fills the registration form with valid data', async () => {
  const registerPage = new RegisterPage(page);

  await registerPage.fillRegistrationForm(testUser);
});

When('accepts the personal data treatment authorization', async () => {
  const registerPage = new RegisterPage(page);

  await registerPage.acceptDataTreatment();
});

When('clicks the Register button', async () => {
  const registerPage = new RegisterPage(page);

  await registerPage.clickRegister();
});

Then('the user should be registered successfully', async () => {
  const registerPage = new RegisterPage(page);

  await registerPage.verifyRegistrationSuccess();
});