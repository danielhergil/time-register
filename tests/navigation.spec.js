require('dotenv').config()
const { test, expect } = require('@playwright/test');

test.use({
    geolocation: {
      latitude: 40.4351358,
      longitude: -3.3017554,
    },
    permissions: ['geolocation'],
});

test('time register', async ({ page }) => {
    
    await page.goto('https://empleadovillalbilla.eadministracion.es/PortalEmpleado/Menus/wfrBienvenida.aspx?param=MjgmMTcy');
    await page.locator('xpath=//div[@id="btnSession_CD"]').click();

    await page.locator('xpath=//input[@id="master_pnlContenido_txtLogin_I"]').fill(process.env.POL_USER)
    await page.locator('xpath=//input[@id="master_pnlContenido_txtPassword_I"]').fill(process.env.POL_USER)
    
    await page.locator('xpath=//div[@id="master_pnlContenido_btnAceptar_CD"]').click();

    await page.locator('xpath=(//li[@class="menu-hasdropdown"])[4]').hover()
    await page.waitForTimeout(1000)

    await page.locator('xpath=//a[@href="../Personal/wfrFichaje.aspx"]').click()

    await page.waitForTimeout(10000)

    // await page.locator('xpath=//div[@id="master_pnlContenido_btnFichar"]').click();

    await page.screenshot({ path: 'screenshot.png' });
  });