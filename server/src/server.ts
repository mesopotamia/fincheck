import {init} from "./index";
import {getScore} from "./institutions/equifax";
import {executeActions, replaceValuesInActions} from "./helpers/actions";
import {Page} from "puppeteer";
import {Action, Extractor} from "./typings";
import CIBCActions from './institutions/cibc/actions.config';
import {extract} from "./helpers/extraction";
import {extractor as mesoMMExtractor, actions as mesoMMActions} from './institutions/td/meso-mm.config';
import {extractor as mesoHoldExtractor, actions as mesoHoldActions} from './institutions/td/meso-hold.config';

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
const getResults = async (actions: Action[], extractor: Extractor | Extractor[], req, res, next) => {
    try {
        page = await init(false);
        await executeActions(page, actions);
        const result = await extract(page, extractor);
        res.send(result);
    }
    catch(e) {
        next(e);
    }
    finally {
        await page.browser().close();
    }
};
app.get('/summary', async (req, res, next) => {
    const {username, password} = req.query;
    const actions = CIBCActions.actions;
    const newActions = replaceValuesInActions(actions, {username, password});
    const extractor = CIBCActions.extractor;
    await getResults(newActions, extractor, req, res, next);
});
app.get('/td/mesoMM/netWorth', async (req, res, next) => {
    const {username, password} = req.query;
    const newActions = replaceValuesInActions(mesoMMActions, {username, password});
    await getResults(newActions, mesoMMExtractor, req, res, next);
});
app.get('/td/mesoHolding/netWorth', async (req, res, next) => {
    const {username, password} = req.query;
    const newActions = replaceValuesInActions(mesoHoldActions, {username, password});
    await getResults(newActions, mesoHoldExtractor, req, res, next);
});
app.get('/credit-score', async (req, res, next) => {
    const {username, password} = req.query;
    console.log('got query', req.query);
    try {
        page = await init(false);
        const score = await getScore(page, 'https://www.econsumer.equifax.ca/canadaotc/showmyequifax.ehtml?locale_code=en_ca&_ga=2.19025976.1079285246.1555198618-331063922.1555198618', {username, password});
        console.log('got score', score);
        await page.browser().close();
        res.send(score)
    }
    catch(e) {
        next(e)
    }
});
app.post('/actions', async(req, res, next) => {
    try {
        page = await init(true);
        const actions: Action[] = req.body.actions;
        const extractor: Extractor = req.body.extractor;
        await executeActions(page, actions);
        const result = await extract(page, extractor);
        res.send(result);
    }
    catch(e) {
        next(e);
    }

});
app.listen(port, () => console.log(`FinCheck listening on port ${port}!`));