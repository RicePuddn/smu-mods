import { loginToBoss } from "./auth";
import { getDriver } from "./driver";

const baseUrl = "https://boss.intranet.smu.edu.sg/";

const driver = getDriver();

await loginToBoss(driver, baseUrl);

await driver
  .navigate()
  .to(`${baseUrl}/ClassSearch.aspx?SelectedCourseCareer=UGRD`);
