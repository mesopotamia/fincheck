import {init} from './index';
import {Page} from "puppeteer";

const {CIBC_user, CIBC_password} = process.env;

const navigate = async (page: Page, url: string) => {
    await page.setViewport({width: 1375, height: 1000});
    await page.goto(url, {waitUntil: "networkidle2"});
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
    const page = await init();
    await navigate(page, 'https://www.cibc.com/en/personal-banking.html');
})();