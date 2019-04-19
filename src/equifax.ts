import {init} from './index';
import {Page} from "puppeteer";

const {Equifax_user, Equifax_password} = process.env;

export const getScore = async (page: Page)  => {
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
const login = async (page: Page, url: string, username: string, password: string) => {
    await page.setViewport({width: 1375, height: 1000});
    await page.goto(url, {waitUntil: "networkidle2"});
    const usernameField = await page.$('#userName');
    await usernameField.type(username);
    const passwordField = await page.$('#consumerPwd');
    await passwordField.type(password);
    console.log('entered credentials');
    await Promise.all([
        page.waitForNavigation({waitUntil: "networkidle2"}),
        page.keyboard.press('Enter')
    ]);
    console.log('loaded main page');
};

/*
(async () => {
    const page = await init();
    const loginUrl = 'https://www.econsumer.equifax.ca/canadaotc/showmyequifax.ehtml?locale_code=en_ca&_ga=2.19025976.1079285246.1555198618-331063922.1555198618';
    await login(page, loginUrl, Equifax_user, Equifax_password);
    const score = await getScore(page);
    console.log(score);
})();*/
