import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  private readonly cartLink =
    this.page.locator('a.cart-contents:visible').first();

  private readonly checkoutButton =
    this.page.getByRole('link', {
      name: 'Finalizar compra',
      exact: true,
    });

  async openCart(): Promise<void> {
    await expect(this.cartLink).toBeVisible({
      timeout: 10000,
    });

    await this.cartLink.click();

    await expect(this.page).toHaveURL(
      /bon-bonite\.com\/carrito\/?/
    );
  }

  async proceedToCheckout(): Promise<void> {
    await expect(this.checkoutButton).toBeVisible({
      timeout: 10000,
    });

    await this.checkoutButton.click();

    await expect(this.page).toHaveURL(
      /bon-bonite\.com\/finalizar-compra\/?/
    );
  }
}