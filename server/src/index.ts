import {launch} from 'puppeteer';

export const init = async (headless: boolean = true) => {
    const browser = await launch({headless, devtools: true/*, args: ['--headless']*/});
    const pages = await browser.pages();
    const page = pages[0];
    await page.setViewport({width: 1375, height: 1000});
    await page.setCacheEnabled(false);
    return page;
};
