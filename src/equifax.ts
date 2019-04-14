import {init} from './index';
import {Page} from "puppeteer";

const {Equifax_user, Equifax_password} = process.env;

const navigate = async (page: Page, url: string) => {
    await page.setViewport({width: 1375, height: 1000});
    await page.goto(url, {waitUntil: "networkidle2"});
    const username = await page.$('#userName');
    await username.type(Equifax_user);
    const password = await page.$('#consumerPwd');
    await password.type(Equifax_password);
    console.log('entered credentials');


    await Promise.all([
        page.waitForNavigation({waitUntil: "networkidle2"}),
        page.keyboard.press('Enter')
    ]);


    console.log('loaded main page');
    await page.waitForSelector('#ppeData > div.agencyBoxScaleMid > p.bigScore');
    const score = await page.evaluate(() =>
        document.querySelector('#ppeData > div.agencyBoxScaleMid > p.bigScore').textContent
    );
    const status = await page.evaluate(() =>
        document.querySelector('#ppeData > div.agencyBoxScaleMid > p.bigScoreDesc').textContent
    );
    console.log(score, status);
};

(async () => {
    const page = await init();
    await navigate(page, 'https://www.econsumer.equifax.ca/canadaotc/showmyequifax.ehtml?locale_code=en_ca&_ga=2.19025976.1079285246.1555198618-331063922.1555198618');
})();