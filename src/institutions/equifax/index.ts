import {Page} from "puppeteer";
import {login} from "../../helpers/login";

export const getScore = async (page: Page, url: string, {username, password})  => {
    await page.goto(url, {waitUntil: "networkidle2"});
    await login(page, username, password, await page.$('#userName'), await page.$('#consumerPwd')
    );
    console.log('getting score');
    await page.waitForSelector('#ppeData > div.agencyBoxScaleMid > p.bigScore');
    const score = await page.evaluate(() =>
        document.querySelector('#ppeData > div.agencyBoxScaleMid > p.bigScore').textContent
    );
    const status = await page.evaluate(() =>
        document.querySelector('#ppeData > div.agencyBoxScaleMid > p.bigScoreDesc').textContent
    );
    return {
        score,
        status
    }
};