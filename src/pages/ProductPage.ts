import { Page, expect } from '@playwright/test';

export class ProductPage {
  constructor(private readonly page: Page) {}

  private readonly desktopMenuButton =
    this.page.locator('#toggle-desktop-menu');

  private readonly shoesLink =
    this.page
      .locator('a:not([href])')
      .filter({
        hasText: /^Zapatos$/,
      })
      .first();

  private readonly bootsAndBootiesLink =
    this.page.getByRole('link', {
      name: 'Botas y botines',
      exact: true,
    });

  private readonly productImage =
    this.page.locator('#image-1031469');

  private readonly addToCartButton =
    this.page.getByRole('button', {
      name: 'Añadir al carrito',
      exact: true,
    });

  async openProductsMenu(): Promise<void> {
    await this.desktopMenuButton.waitFor({
      state: 'visible',
      timeout: 10000,
    });

    const menuState =
      await this.desktopMenuButton.getAttribute('aria-pressed');

    if (menuState === 'false') {
      await this.desktopMenuButton.click();
    }

    await expect(this.desktopMenuButton).toHaveAttribute(
      'aria-pressed',
      'true',
      { timeout: 5000 }
    );
  }

  async openShoesMenu(): Promise<void> {
    await expect(this.shoesLink).toBeVisible({
      timeout: 10000,
    });

    await this.shoesLink.click();
  }

  async navigateToBootsAndBooties(): Promise<void> {
    await expect(this.bootsAndBootiesLink).toBeVisible({
      timeout: 10000,
    });

    await this.bootsAndBootiesLink.click();
  }

  async selectProduct(): Promise<void> {
    await expect(this.productImage).toBeVisible({
      timeout: 10000,
    });

    await this.productImage.click();

    await this.selectAvailableSize();
  }

  private async selectAvailableSize(): Promise<void> {
    const availableSize = this.page.locator(
      'button.variation-button[data-attribute_name="attribute_pa_talla"]:not(.disabled)'
    ).first();

    await expect(availableSize).toBeVisible({
      timeout: 10000,
    });

    await availableSize.click();

    await expect(availableSize).toHaveClass(/selected/);
  }

  async addToCart(): Promise<void> {
    await expect(this.addToCartButton).toBeVisible({
      timeout: 10000,
    });

    await expect(this.addToCartButton).toBeEnabled({
      timeout: 10000,
    });

    await this.addToCartButton.click();
  }
}