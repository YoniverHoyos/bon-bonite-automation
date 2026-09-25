Feature: Product purchase

  Scenario: Successful product purchase
    Given the user registers with valid data
    When the user opens the products menu
    Then the main menu options should be displayed
    And the user opens the shoes menu
    And the user selects a product
    And adds the product to the cart
    And completes the checkout
    Then the order should be created successfully