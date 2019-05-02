import {Page} from "puppeteer";

export const extract = async(page, selector) => {
    console.log('selector', selector);
    await page.waitForSelector(selector);
    return await page.evaluate(
       (selector) => document.querySelector(selector).textContent
   , selector);
};
export const navigate = async(page: Page, url: string) => {
    await page.goto(url, {
        waitUntil: "networkidle2"
    });
};
