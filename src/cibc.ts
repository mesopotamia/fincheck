import {Page} from "puppeteer";
import {login} from "./helpers/login";


export const getSummary = async (page: Page, url: string, {username, password}) => {
    await page.setViewport({width: 1375, height: 1000});
    await page.goto(url, {waitUntil: "networkidle2"});
    const usernameSelector = await page.$$('input');
    const passwordSelector = await page.$$('input');
    await login(page, url, username, password, usernameSelector[9], passwordSelector[11]);
    await page.waitForNavigation();
    console.log('loaded accounts page');
    return await page.evaluate(() => {
        return {
            assets: document.querySelectorAll('div > div > span > span.category-balance > span')[0].textContent,
            liabilities: document.querySelectorAll('div > div > span > span.category-balance > span')[1].textContent
        }
    });
};