import { Page, expect } from '@playwright/test';

export class RegisterPage {
  constructor(private readonly page: Page) {}

  private readonly registerLink =
    this.page.locator('#show_register');

  private readonly documentInput =
    this.page.getByRole('textbox', {
      name: /Número de cédula.*Obligatorio/i,
    });

  private readonly firstNameInput =
    this.page.locator('#first_name');

  private readonly lastNameInput =
    this.page.locator('#last_name');

  private readonly emailInput =
    this.page.getByRole('textbox', {
      name: /Correo electrónico.*Obligatorio/i,
    });

  private readonly passwordInput =
    this.page.locator('#reg_password');

  private readonly confirmPasswordInput =
    this.page.locator('#reg_password2');

  private readonly dataTreatmentCheckbox =
    this.page.locator('#privacy_policy_reg');

  private readonly registerButton =
    this.page.getByRole('button', {
      name: 'Registrarme',
    });

  async navigateToRegistration(): Promise<void> {
    await this.registerLink.waitFor({
      state: 'visible',
      timeout: 10000,
    });

    await this.registerLink.click();
  }

  async verifyRegistrationPage(): Promise<void> {
    await expect(this.passwordInput).toBeVisible({
      timeout: 10000,
    });
  }

  async fillRegistrationForm(data: {
    document: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Promise<void> {
    await this.documentInput.fill(data.document);
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.emailInput.fill(data.email);
    await this.passwordInput.fill(data.password);
    await this.confirmPasswordInput.fill(data.password);
  }

  async acceptDataTreatment(): Promise<void> {
    await this.dataTreatmentCheckbox.check();
  }

  async clickRegister(): Promise<void> {
    await this.registerButton.click();

    await this.page.waitForTimeout(1000);
  }

  async verifyRegistrationSuccess(): Promise<void> {
    await expect(this.page).toHaveURL(
      /bon-bonite\.com\/mi-cuenta\/orders\//
    );

    await expect(this.page).toHaveTitle(
      /Pedidos.*Bon-Bonite/i
    );
  }
}