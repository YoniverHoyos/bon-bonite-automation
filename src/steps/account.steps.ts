import { Given, When, Then } from '@cucumber/cucumber';
import { page } from '../support/hooks';
import { AccountPage } from '../pages/AccountPage';
import { RegisterPage } from '../pages/RegisterPage';
import { env } from '../config/env';
import { testUser, updatedPersonalData } from '../test-data/users';


Given('the user registers with valid data', async () => {
  await page.goto(`${env.baseUrl}/mi-cuenta/`, {
    waitUntil: 'domcontentloaded',
    timeout: 15000,
  });

  const registerPage = new RegisterPage(page);

  await registerPage.navigateToRegistration();
  await registerPage.verifyRegistrationPage();

  await registerPage.fillRegistrationForm(testUser);
  await registerPage.acceptDataTreatment();
  await registerPage.clickRegister();
  await registerPage.verifyRegistrationSuccess();
});

When('the user opens the personal data section', async () => {
  const accountPage = new AccountPage(page);

  await accountPage.navigateToPersonalData();
});

When('opens the personal data update form', async () => {
  const accountPage = new AccountPage(page);

  await accountPage.openUpdateForm();
});

When('updates the personal information', async () => {
  const accountPage = new AccountPage(page);

  await accountPage.updatePersonalData(updatedPersonalData);
});

When('saves the changes', async () => {
  const accountPage = new AccountPage(page);

  await accountPage.saveChanges();
});

Then('the personal data should be updated successfully', async () => {
  const accountPage = new AccountPage(page);

  await accountPage.verifyUpdateSuccess();
});