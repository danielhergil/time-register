require("dotenv").config();
const { test, expect } = require("@playwright/test");

// Generate a random number between min (inclusive) and max (exclusive)
function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

// Define the range
const minLat = 40.435;
const maxLat = 40.4353;

const minLon = -3.3016;
const maxLon = -3.3019;

// Generate the random number
const randomNumberLatitude = getRandomNumber(minLat, maxLat);
const randomNumberLongitude = getRandomNumber(minLon, maxLon);

console.log(randomNumberLatitude.toFixed(5)); // Output with 5 decimal places
console.log(randomNumberLongitude.toFixed(5)); // Output with 5 decimal places

test.use({
  geolocation: {
    latitude: parseFloat(randomNumberLatitude.toFixed(5)),
    longitude: parseFloat(randomNumberLongitude.toFixed(5)),
  },
  permissions: ["geolocation"],
});

test("time register in", { tag: "@entrada" }, async ({ page }) => {
  await page.goto(
    "https://empleadovillalbilla.eadministracion.es/PortalEmpleadoV2/Menus/wfrBienvenida.aspx?param=MjgmMTcy&BORDE=S"
  );
  // await page.locator('xpath=//div[@id="btnSession_CD"]').click();

  await page
    .locator('xpath=//input[@id="master_pnlContenido_txtLogin_I"]')
    .fill(process.env.POL_USER);
  await page
    .locator('xpath=//input[@id="master_pnlContenido_txtPassword_I"]')
    .fill(process.env.POL_USER);

  await page.locator('xpath=//div[@id="master_pnlContenido_btnAceptar_CD"]').click();
  await page.goto(
    "https://empleadovillalbilla.eadministracion.es/PortalEmpleadoV2/Personal/wfrFichaje.aspx"
  );

  await page.waitForTimeout(5000);

  await page.locator('xpath=//input[@id="master_pnlContenido_cmbMotivoFichaje_I"]').click();

  await page.waitForSelector('xpath=//td[normalize-space(text())="E - Entrada"]');
  await page.locator('xpath=//td[normalize-space(text())="E - Entrada"]').click();

  await page.waitForTimeout(2000);

  await page.locator('xpath=//div[@id="master_pnlContenido_btnFichar"]').click();
  await page.waitForTimeout(10000);
  await page.screenshot({ path: "screenshot.png" });
});

test("time register exit", { tag: "@salida" }, async ({ page }) => {
  await page.goto(
    "https://empleadovillalbilla.eadministracion.es/PortalEmpleadoV2/Menus/wfrBienvenida.aspx?param=MjgmMTcy&BORDE=S"
  );
  // await page.locator('xpath=//div[@id="btnSession_CD"]').click();

  await page
    .locator('xpath=//input[@id="master_pnlContenido_txtLogin_I"]')
    .fill(process.env.POL_USER);
  await page
    .locator('xpath=//input[@id="master_pnlContenido_txtPassword_I"]')
    .fill(process.env.POL_USER);

  await page.locator('xpath=//div[@id="master_pnlContenido_btnAceptar_CD"]').click();

  await page.goto(
    "https://empleadovillalbilla.eadministracion.es/PortalEmpleadoV2/Personal/wfrFichaje.aspx"
  );

  await page.waitForTimeout(5000);

  await page.locator('xpath=//input[@id="master_pnlContenido_cmbMotivoFichaje_I"]').click();

  await page.waitForSelector('xpath=//td[normalize-space(text())="S - Salida"]');
  await page.locator('xpath=//td[normalize-space(text())="S - Salida"]').click();

  await page.waitForTimeout(2000);

  await page.locator('xpath=//div[@id="master_pnlContenido_btnFichar"]').click();
  await page.waitForTimeout(10000);
  await page.screenshot({ path: "screenshot.png" });
});
