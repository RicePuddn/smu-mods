// import path from "path";
// import { fileURLToPath } from "url";
import { Builder } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";

export function getDriver() {
  // const __filename = fileURLToPath(import.meta.url);
  // const __dirname = path.dirname(__filename);

  // const directoryPath = path.resolve(__dirname, "..");
  // const projectBaseDir = path.resolve(directoryPath, "..");

  // const timestamp = new Date().toISOString().replace(/:/g, "-");

  const options = new chrome.Options();
  options.addArguments("--start-maximized");

  // Build WebDriver
  const driver = new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  return driver;
}
