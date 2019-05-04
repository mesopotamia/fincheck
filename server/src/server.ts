import {init} from "./index";
import {getSummary} from "./institutions/cibc";
import {getScore} from "./institutions/equifax";
import {executeActions, extract, navigate} from "./helpers";
import {Page} from "puppeteer";
import {Action, Extractor} from "./typings";
const bodyParser = require('body-parser');
const express = require('express');
const timeout = require('connect-timeout');
const app = express();

app.use(bodyParser.json());
let page: Page;
const port = 3000;
const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
};
app.use(allowCrossDomain);
app.use(timeout('60s'));
// noinspection JSUnusedLocalSymbols
app.use(async(err, req, res, next) => {
    await page.browser().close();
    res.send('error');
});
app.get('/summary', async (req, res, next) => {
    const {username, password} = req.query;
    console.log('got query', req.query);
    try {
        page = await init(false);
        const summary = await getSummary(page, 'https://www.cibc.com/en/personal-banking.html', {username, password});
        await page.browser().close();
        res.send(summary)
    }
    catch(e) {
        next(e);
    }
});
app.get('/credit-score', async (req, res, next) => {
    const {username, password} = req.query;
    console.log('got query', req.query);
    try {
        page = await init(true);
        const score = await getScore(page, 'https://www.econsumer.equifax.ca/canadaotc/showmyequifax.ehtml?locale_code=en_ca&_ga=2.19025976.1079285246.1555198618-331063922.1555198618', {username, password});
        console.log('got score', score);
        await page.browser().close();
        res.send(score)
    }
    catch(e) {
        next(e)
    }
});
app.post('/query', async(req, res, next) => {
    const body = req.body;
    const {selector, url} = body;
    try {
        page = await init(false);
        await navigate(page, url);
        const result = await extract(page, selector);
        res.send(result);
        await page.browser().close();
    }
    catch(e) {
        next(e);
    }
});
app.post('/actions', async(req, res, next) => {
    try {
        page = await init(false);
        const actions: Action[] = req.body.actions;
        const extractor: Extractor = req.body.extractor;
        await executeActions(page, actions);
        console.log('selector', extractor.selector);
        const result = await extract(page, extractor.selector);
        res.send(result);
    }
    catch(e) {
        next(e);
    }

});
app.listen(port, () => console.log(`FinCheck listening on port ${port}!`));