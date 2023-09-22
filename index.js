require('dotenv').config();
const puppeteer = require('puppeteer');
const { USER, PASSWORD } = process.env;

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    // Set screen size
    await page.setViewport({width: 1280, height: 800});

    // Main page
    await page.goto('https://soysocio.bocajuniors.com.ar/');
    // Login
    await page.click('#loginButton2');

    // const pages = await browser.pages();
    const popupTarget = await browser.waitForTarget(target => target.url() === 'https://pgs-baas.bocajuniors.com.ar/baas/login.jsp?login_by=email')
    const popupPage = await popupTarget.page();
    await popupPage.waitForSelector('#email');
    await popupPage.type('#email', USER);
    await popupPage.type('#password', PASSWORD);

    await popupPage.click('form button[type="submit"]');
    await popupPage.close();
    await page.click('#loginButton2');
    await page.waitForSelector('.overlay');
    await page.click('.popup_imagen_close');

    await page.goto('https://soysocio.bocajuniors.com.ar/comprar_plano_asiento.php?eNid=658&esNid=68920')
    
    await page.waitForSelector('.d');
    await page.click('.d');
    // const SAI = await page.waitForSelector('#SAI > .section-enabled');

    // https://soysocio.bocajuniors.com.ar/comprar_plano_asiento.php?eNid=659&esNid=68920
    
    // await page.click('#SAI');
    
    // await page.waitForSelector('.loc d');
    // await page.click('.loc d');

    // way 2
    // const elementHandles = await page.$$('a');
    // const propertyJsHandles = await Promise.all(
    //   elementHandles.map(handle => handle.getProperty('href'))
    // );
    // const hrefs2 = await Promise.all(
    //   propertyJsHandles.map(handle => handle.jsonValue())
    // );

    // console.log(hrefs2);
    
    // Type into search box
    // await page.type('.search-box__input', 'automate beyond recorder');

    // Wait and click on first result
    // const searchResultSelector = '.search-box__link';
    // await page.waitForSelector(searchResultSelector);
    // await page.click(searchResultSelector);

    // Locate the full title with a unique string
    // const textSelector = await page.waitForSelector(
    // 'text/Customize and automate'
    // );
    // const fullTitle = await textSelector?.evaluate(el => el.textContent);

    // Print the full title
    // console.log('The title of this blog post is "%s".', fullTitle);

    // await browser.close();
})();
