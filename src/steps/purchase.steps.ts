import { When, Then } from '@cucumber/cucumber';

import { page } from '../support/hooks';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { checkoutData } from '../test-data/users';

When('the user opens the products menu', async () => {
  const productPage = new ProductPage(page);

  await productPage.openProductsMenu();
});

When('the user opens the shoes menu', async () => {
  const productPage = new ProductPage(page);

  await productPage.openShoesMenu();
});

When('the user selects a product', async () => {
  const productPage = new ProductPage(page);

  await productPage.navigateToBootsAndBooties();
  await productPage.selectProduct();
});

When('adds the product to the cart', async () => {
  const productPage = new ProductPage(page);

  await productPage.addToCart();
});

When('completes the checkout', async () => {
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await cartPage.openCart();
  await cartPage.proceedToCheckout();

  await checkoutPage.verifyCheckoutPage();
  await checkoutPage.continueToShippingData();

  await checkoutPage.enterPhone(checkoutData.phone);
  await checkoutPage.selectCountry();
  await checkoutPage.selectState(checkoutData.state);
  await checkoutPage.selectCity(checkoutData.city);
  await checkoutPage.enterAddress(checkoutData.address);

  await checkoutPage.acceptTerms();
  await checkoutPage.placeOrder();
});

Then('the order should be created successfully', async () => {
  const checkoutPage = new CheckoutPage(page);

  await checkoutPage.verifyOrderCreated();
});

Then('the main menu options should be displayed', async () => {
  const productPage = new ProductPage(page);

  await productPage.verifyMainMenuOptions();
});