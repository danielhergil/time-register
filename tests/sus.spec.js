require('dotenv').config()
const { test } = require('@playwright/test');

// Generate a random number between min (inclusive) and max (exclusive)
function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

// Define the range
const minLat = 40.43500;
const maxLat = 40.43530;

const minLon = -3.30160;
const maxLon = -3.30190;

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
    permissions: ['geolocation'],
});


test('time register in', {tag: '@entrada',}, async ({ page }) => {
    
    await page.goto('https://empleadovillalbilla.eadministracion.es/PortalEmpleado/Menus/wfrBienvenida.aspx?param=MjgmMTcy');
    await page.locator('xpath=//div[@id="btnSession_CD"]').click();

    await page.locator('xpath=//input[@id="master_pnlContenido_txtLogin_I"]').fill(process.env.POL_SUS_USER)
    await page.locator('xpath=//input[@id="master_pnlContenido_txtPassword_I"]').fill(process.env.POL_SUS_PASS)
    
    await page.locator('xpath=//div[@id="master_pnlContenido_btnAceptar_CD"]').click();

    // await page.locator('xpath=(//li[@class="menu-hasdropdown"])[4]').hover()
    // await page.waitForTimeout(2000)

    // await page.locator('xpath=//a[@href="../Personal/wfrFichaje.aspx"]').click()

    await page.goto("https://empleadovillalbilla.eadministracion.es/PortalEmpleado/Personal/wfrFichaje.aspx")

    await page.waitForTimeout(5000)

    await page.locator('xpath=//input[@id="master_pnlContenido_cmbMotivoFichaje_I"]').click()
    await page.locator('xpath=//td[@id="master_pnlContenido_cmbMotivoFichaje_DDD_L_LBI0T0"]').click()

    await page.waitForTimeout(2000)

    await page.locator('xpath=//div[@id="master_pnlContenido_btnFichar"]').click();
    await page.waitForTimeout(10000)
    await page.screenshot({ path: 'screenshot.png' });
  });

  test('time register exit', {tag: '@salida',}, async ({ page }) => {
    
    await page.goto('https://empleadovillalbilla.eadministracion.es/PortalEmpleado/Menus/wfrBienvenida.aspx?param=MjgmMTcy');
    await page.locator('xpath=//div[@id="btnSession_CD"]').click();

    await page.locator('xpath=//input[@id="master_pnlContenido_txtLogin_I"]').fill(process.env.POL_SUS_USER)
    await page.locator('xpath=//input[@id="master_pnlContenido_txtPassword_I"]').fill(process.env.POL_SUS_PASS)
    
    await page.locator('xpath=//div[@id="master_pnlContenido_btnAceptar_CD"]').click();

    // await page.locator('xpath=(//li[@class="menu-hasdropdown"])[4]').hover()
    // await page.waitForTimeout(2000)

    // await page.locator('xpath=//a[@href="../Personal/wfrFichaje.aspx"]').click()

    await page.goto("https://empleadovillalbilla.eadministracion.es/PortalEmpleado/Personal/wfrFichaje.aspx")

    await page.waitForTimeout(5000)

    await page.locator('xpath=//input[@id="master_pnlContenido_cmbMotivoFichaje_I"]').click()
    await page.locator('xpath=//td[@id="master_pnlContenido_cmbMotivoFichaje_DDD_L_LBI0T0"]').click()

    await page.waitForTimeout(2000)

    await page.locator('xpath=//div[@id="master_pnlContenido_btnFichar"]').click();
    await page.waitForTimeout(10000)
    await page.screenshot({ path: 'screenshot.png' });
  });