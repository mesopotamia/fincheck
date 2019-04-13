import {Browser, launch, Page} from 'puppeteer';
let browser: Browser;
let page: Page;

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
    await page.goto(url).then((data) => {
        console.log(data)
    });
};
(async () => {
    await init();
    await navigate('https://google.com');
})();



