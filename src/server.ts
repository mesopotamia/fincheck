import {init} from "./index";
import {getSummary} from "./cibc";
import {getScore} from "./equifax";
import {login, logout} from "./helpers/login";
const express = require('express');
const timeout = require('connect-timeout');
const app = express();
const port = 3000;
app.use(timeout('60s'));
app.get('/summary', async (req, res) => {
    const {username, password} = req.query;
    console.log('got query', req.query);
    let page;
    try {
        page = await init(true);
        const summary = await getSummary(page, 'https://www.cibc.com/en/personal-banking.html', {username, password});
        /*const logoutButton = await page.$('.signout .ui-wrapper');
        await logout(page, logoutButton);*/
        await page.browser().close();
        res.send(summary)
    }
    catch(e) {
        await page.browser().close();
        res.send(e.message)
    }
});
app.get('/credit-score', async (req, res) => {
    const {username, password} = req.query;
    console.log('got query', req.query);
    let page;
    try {
        page = await init(false);
        await page.setViewport({width: 1375, height: 1000});
        await page.goto('https://www.econsumer.equifax.ca/canadaotc/showmyequifax.ehtml?locale_code=en_ca&_ga=2.19025976.1079285246.1555198618-331063922.1555198618', {waitUntil: "networkidle2"});
        await login(
            page,
            'https://www.econsumer.equifax.ca/canadaotc/showmyequifax.ehtml?locale_code=en_ca&_ga=2.19025976.1079285246.1555198618-331063922.1555198618',
            username,
            password,
            await page.$('#userName'),
            await page.$('#consumerPwd')
        );
        const score = await getScore(page);
        console.log('got score', score);
        await page.browser().close();
        res.send(score)
    }
    catch(e) {
        await page.browser().close();
        res.send(e.message)
    }
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));