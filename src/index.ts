import {Browser, launch, Page} from 'puppeteer';

let browser: Browser;
let page: Page;
const {CIBC_user, CIBC_password} = process.env;
console.log(CIBC_user, CIBC_password);
const init = async () => {
    if (browser) {
        await close();
    }
    browser = await launch({headless: false});
    page = await browser.newPage();
};
const close = async () => {
    return await browser.close();
};
const navigate = async (url) => {
    await page.setViewport({width: 1375, height: 1000});
    await page.goto(url, {waitUntil: "networkidle0"});
    const username = await page.$$('input');
    await username[9].type(CIBC_user);
    const password = await page.$$('input');
    await password[11].type(CIBC_password);
    await Promise.all([
        page.waitForNavigation({waitUntil: "networkidle0"}),
        page.keyboard.press('Enter')
    ]);
    const remindMeLater = await page.$('div.offer-page.lang-en > main > div.offer-application > div > div.offer-defer > button > span');
    if (remindMeLater) {
        await remindMeLater.click();
    }
    // await password.press(String.fromCharCode(13));
};
(async () => {
    await init();
    await navigate('https://www.cibc.com/en/personal-banking.html');
})();



