import { Page, expect } from '@playwright/test';

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  private readonly continueButton =
    this.page.getByRole('button', {
      name: 'Continuar',
      exact: true,
    });

  private readonly countrySelector =
    this.page.locator('#select2-billing_country-container');

  private readonly stateSelector =
    this.page.locator('#select2-billing_state-container');

  private readonly citySelector =
    this.page.locator('#select2-billing_city-container');

  private readonly phoneInput =
    this.page.locator('#billing_phone');

  private readonly addressInput =
    this.page.locator('#billing_address_1');

  private readonly termsCheckbox =
    this.page.locator('#terms');

  private readonly placeOrderButton =
    this.page.getByRole('button', {
      name: 'Registrar Orden',
      exact: true,
    });

  private readonly orderSuccessMessage =
    this.page.getByRole('heading', {
      name: '¡Tu orden se registró con éxito!',
      exact: true,
    });

  async verifyCheckoutPage(): Promise<void> {
    await expect(this.page).toHaveURL(
      /bon-bonite\.com\/finalizar-compra\/?/
    );
  }

  async continueToShippingData(): Promise<void> {
    await expect(this.continueButton).toBeVisible({
      timeout: 10000,
    });

    await this.continueButton.click();
  }

  async selectCountry(): Promise<void> {
    await expect(this.countrySelector).toBeVisible({
      timeout: 10000,
    });

    await this.countrySelector.click();

    const countryOption = this.page.getByRole('option', {
      name: 'Colombia',
      exact: true,
    });

    await expect(countryOption).toBeVisible({
      timeout: 10000,
    });

    await countryOption.click();
  }

  async selectState(state: string): Promise<void> {
    await expect(this.stateSelector).toBeVisible({
      timeout: 10000,
    });

    await this.stateSelector.click();

    const stateOption = this.page.getByRole('option', {
      name: state,
      exact: true,
    });

    await expect(stateOption).toBeVisible({
      timeout: 10000,
    });

    await stateOption.click();
  }

  async selectCity(city: string): Promise<void> {
    await expect(this.citySelector).toBeVisible({
      timeout: 10000,
    });

    await this.citySelector.click();

    const cityOption = this.page.getByRole('option', {
      name: city,
      exact: true,
    });

    await expect(cityOption).toBeVisible({
      timeout: 10000,
    });

    await cityOption.click();
  }

  async enterPhone(phone: string): Promise<void> {
    await expect(this.phoneInput).toBeVisible({
      timeout: 10000,
    });

    await this.phoneInput.fill(phone);
  }

  async enterAddress(address: string): Promise<void> {
    await expect(this.addressInput).toBeVisible({
      timeout: 10000,
    });

    await this.addressInput.fill(address);
  }

  async acceptTerms(): Promise<void> {
    await expect(this.termsCheckbox).toBeVisible({
      timeout: 10000,
    });

    await this.termsCheckbox.check();

    await expect(this.termsCheckbox).toBeChecked();
  }

  async placeOrder(): Promise<void> {
    await expect(this.placeOrderButton).toBeVisible({
      timeout: 10000,
    });

    await expect(this.placeOrderButton).toBeEnabled({
      timeout: 10000,
    });

    await this.placeOrderButton.click();
  }

  async verifyOrderCreated(): Promise<void> {
    await expect(this.orderSuccessMessage).toBeVisible({
      timeout: 15000,
    });
  }
}