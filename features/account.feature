Feature: Personal data management

  Scenario: Update personal data of a registered user
    Given the user registers with valid data
    When the user opens the personal data section
    And opens the personal data update form
    And updates the personal information
    And saves the changes
    Then the personal data should be updated successfully