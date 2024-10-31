import { By, ThenableWebDriver, until } from "selenium-webdriver";

export async function loginToBoss(driver: ThenableWebDriver, baseUrl: string) {
  try {
    // Navigate to the website that redirects to login on another domain
    await driver.get(baseUrl);

    // Wait for the login page to load, specifying the path where the user needs to enter email and password
    const loginFormPath = "//input[@id='userNameInput']";
    await driver.wait(until.elementLocated(By.xpath(loginFormPath)), 10000);

    console.log(
      "Please enter your email and password manually, then click login.",
    );

    // Wait for user to manually input credentials and click login
    // This example waits for the password field to disappear (assuming it disappears after successful submission)
    const passwordFieldPath = "//input[@id='passwordInput']";
    await driver.wait(
      until.stalenessOf(driver.findElement(By.xpath(passwordFieldPath))),
      300000,
    ); // Wait up to 5 minutes

    console.log("Waiting for Microsoft two-factor authentication to complete.");

    // Wait for the redirect after two-factor authentication
    await driver.wait(async () => {
      const currentUrl = await driver.getCurrentUrl();
      return currentUrl.includes(baseUrl); // Update this to the expected URL after successful login
    }, 300000); // Wait up to 5 minutes

    console.log("Login successful, redirected to the home page.");
  } catch (error) {
    console.error("An error occurred during the login process:", error);
    await driver.quit();
  }
}
