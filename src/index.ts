import {launch} from 'puppeteer';

export const init = async () => {
    const browser = await launch({headless: false});
    return await browser.newPage();
};


