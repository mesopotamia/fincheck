import {Browser, launch, Page} from 'puppeteer';

let browser: Browser;
let page: Page;
const {CIBC_user, CIBC_password} = process.env;
const init = async () => {
    if (browser) {
        await close();
    }
    browser = await launch({headless: true});
    page = await browser.newPage();
};
const close = async () => {
    return await browser.close();
};
const navigate = async (url) => {
    await page.setViewport({width: 1375, height: 1000});
    await page.goto(url, {waitUntil: "domcontentloaded"});
    const username = await page.$$('input');
    await username[9].type(CIBC_user);
    const password = await page.$$('input');
    await password[11].type(CIBC_password);
    console.log('entered credentials');


    await Promise.all([
        page.waitForNavigation({waitUntil: "networkidle2"}),
        page.keyboard.press('Enter')
    ]);
    const remindMeLater = await page.$('div.offer-page.lang-en > main > div.offer-application > div > div.offer-defer > button > span');
    if (remindMeLater) {
        await remindMeLater.click();
    }
    await page.waitForNavigation();
    console.log('loaded accounts page');
    const summary = await page.evaluate(() => {
        return {
            assets: document.querySelectorAll('div > div > span > span.category-balance > span')[0].textContent,
            liabilities: document.querySelectorAll('div > div > span > span.category-balance > span')[1].textContent
        }
    });
    console.log(summary);
};
(async () => {
    await init();
    await navigate('https://www.cibc.com/en/personal-banking.html');
})();



