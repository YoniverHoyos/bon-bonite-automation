import { Page, expect } from '@playwright/test';

export class AccountPage {
  constructor(private readonly page: Page) {}

private readonly dataLink =
  this.page.getByRole('link', {
    name: 'Datos',
    exact: true,
  });

  private readonly personalDataHeading =
    this.page.getByRole('heading', {
      name: 'Datos Personales',
    });

  private readonly updateInformationButton =
    this.page.getByRole('button', {
      name: /Actualizar Información/i,
    });

  private readonly birthDateInput =
    this.page.locator('[name="birth_date"]');

  private readonly genderSelect =
    this.page.locator('[name="gender"]');

  private readonly billingPhoneInput =
    this.page.locator('[name="billing_phone"]');

private readonly saveButton =
  this.page.getByRole('button', {
    name: 'Guardar',
    exact: true,
  });
  private readonly updateSuccessMessage =
    this.page.getByText(
      'Datos personales actualizados correctamente',
      { exact: true }
    );

  async navigateToPersonalData(): Promise<void> {
    await this.dataLink.click();

    await expect(this.personalDataHeading).toBeVisible({
      timeout: 10000,
    });
  }

  async openUpdateForm(): Promise<void> {
    await this.updateInformationButton.click();

    await expect(this.birthDateInput).toBeVisible({
      timeout: 10000,
    });
  }

  async updatePersonalData(data: {
    birthDate: string;
    gender: string;
    billingPhone: string;
  }): Promise<void> {
    await this.birthDateInput.fill(data.birthDate);

    await this.genderSelect.selectOption({
        label: data.gender,
   });

    await this.billingPhoneInput.fill(data.billingPhone);
  }

  async saveChanges(): Promise<void> {
    await this.saveButton.click();
  }

  async verifyUpdateSuccess(): Promise<void> {
    await expect(this.updateSuccessMessage).toBeVisible({
      timeout: 10000,
    });
  }
}