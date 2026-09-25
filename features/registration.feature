Feature: User registration

  Scenario: Successful user registration
    Given the user is on the registration page
    When the user fills the registration form with valid data
    And accepts the personal data treatment authorization
    And clicks the Register button
    Then the user should be registered successfully