import {launch} from 'puppeteer';

export const init = async (headless: boolean = true) => {
    const browser = await launch({headless, devtools: true});
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    return page;
};
