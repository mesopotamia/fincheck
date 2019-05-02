import {init} from "./index";
import {getSummary} from "./institutions/cibc";
import {getScore} from "./institutions/equifax";
import {extract, navigate} from "./helpers";
import {Page} from "puppeteer";
const bodyParser = require('body-parser');
const express = require('express');
const timeout = require('connect-timeout');
const app = express();

app.use(bodyParser.json());
const port = 3000;
const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
};
app.use(allowCrossDomain);
app.use(timeout('60s'));
app.get('/summary', async (req, res) => {
    const {username, password} = req.query;
    console.log('got query', req.query);
    let page;
    try {
        page = await init(false);
        const summary = await getSummary(page, 'https://www.cibc.com/en/personal-banking.html', {username, password});
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
        page = await init(true);
        const score = await getScore(page, 'https://www.econsumer.equifax.ca/canadaotc/showmyequifax.ehtml?locale_code=en_ca&_ga=2.19025976.1079285246.1555198618-331063922.1555198618', {username, password});
        console.log('got score', score);
        await page.browser().close();
        res.send(score)
    }
    catch(e) {
        await page.browser().close();
        res.send(e.message)
    }
});
app.post('/query', async(req, res) => {
    const body = req.body;
    const {selector, url} = body;
    let page: Page;
    try {
        page = await init(false);
        await navigate(page, url);
        const result = await extract(page, selector);
        res.send(result);
        await page.browser().close();
    }
    catch(e) {
        res.send(e.message);
    }
});
app.listen(port, () => console.log(`FinCheck listening on port ${port}!`));