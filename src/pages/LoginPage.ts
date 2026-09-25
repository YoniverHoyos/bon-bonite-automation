import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  private readonly documentInput =
    this.page.getByRole('textbox', {
      name: 'Número de cédula*Obligatorio',
    });

  private readonly passwordInput =
    this.page.getByPlaceholder('Contraseña');

  private readonly loginButton =
    this.page.getByRole('button', {
      name: 'Iniciar Sesión',
    });

  async login(document: string, password: string): Promise<void> {
    await this.documentInput.fill(document);
    await this.passwordInput.fill(password);

    await this.loginButton.click();

    await expect(this.page).toHaveURL(
      /bon-bonite\.com\/mi-cuenta/
    );
  }
}