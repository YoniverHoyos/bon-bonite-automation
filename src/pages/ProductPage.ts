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

  private readonly bagsLink =
    this.page
      .locator('a:not([href])')
      .filter({
        hasText: /^Bolsos$/,
      })
      .first();

  private readonly beltsLink =
    this.page
      .locator('a')
      .filter({
        hasText: /^Cinturones$/,
      })
      .first();

  private readonly accessoriesLink =
    this.page
      .locator('a')
      .filter({
        hasText: /^Accesorios$/,
      })
      .first();

  private readonly outletLink =
    this.page
      .locator('a')
      .filter({
        hasText: /^Outlet$/,
      })
      .first();

  private readonly giftCardsLink =
    this.page
      .locator('a')
      .filter({
        hasText: /^Bonos de regalo$/,
      })
      .first();

  private readonly accountLink =
    this.page
      .locator('a')
      .filter({
        hasText: /^Mi cuenta$/,
      })
      .first();

  private readonly customerServiceLink =
    this.page
      .locator('a')
      .filter({
        hasText: /^Servicio al cliente$/,
      })
      .first();

  private readonly socialResponsibilityLink =
    this.page
      .locator('a')
      .filter({
        hasText: /^Responsabilidad social$/,
      })
      .first();

  private readonly pqrsLink =
    this.page
      .locator('a')
      .filter({
        hasText: /^PQRS$/,
      })
      .first();

  private readonly bootsAndBootiesLink =
    this.page.getByRole('link', {
      name: 'Botas y botines',
      exact: true,
    });

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

    await this.desktopMenuButton.click();
  }

  async verifyMainMenuOptions(): Promise<void> {
    const menuOptions = [
      this.shoesLink,
      this.bagsLink,
      this.beltsLink,
      this.accessoriesLink,
      this.outletLink,
      this.giftCardsLink,
      this.accountLink,
      this.customerServiceLink,
      this.socialResponsibilityLink,
      this.pqrsLink,
    ];

    for (const menuOption of menuOptions) {
      await expect(menuOption).toBeVisible({
        timeout: 10000,
      });
    }
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
    const products = this.page.locator(
      'img[id^="image-"]'
    );

    const productCount = await products.count();

    for (let i = 0; i < productCount; i++) {
      const product = products.nth(i);

      if (!(await product.isVisible())) {
        continue;
      }

      await product.click();

      const availableSize = this.page.locator(
        'button.variation-button[data-attribute_name="attribute_pa_talla"]:not(.disabled)'
      ).first();

      const sizeAvailable = await availableSize
        .waitFor({
          state: 'visible',
          timeout: 3000,
        })
        .then(() => true)
        .catch(() => false);

      if (sizeAvailable) {
        await availableSize.click();

        await expect(availableSize).toHaveClass(/selected/);

        return;
      }

      await this.page.goBack({
        waitUntil: 'domcontentloaded',
      });

      await expect(
        this.page.locator('img[id^="image-"]').first()
      ).toBeVisible({
        timeout: 10000,
      });
    }

    throw new Error(
      'No se encontró ningún producto con talla disponible.'
    );
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