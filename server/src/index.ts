import {launch} from 'puppeteer';

export const init = async (headless: boolean = true) => {
    const args = [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-infobars',
        '--window-position=0,0',
        '--ignore-certifcate-errors',
        '--ignore-certifcate-errors-spki-list',
        '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"']
    const browser = await launch({headless, devtools: true, args, ignoreHTTPSErrors: true});
    const pages = await browser.pages();
    const page = pages[0];
    await page.setViewport({width: 1375, height: 1000});
    await page.setCacheEnabled(false);
    return page;
};
