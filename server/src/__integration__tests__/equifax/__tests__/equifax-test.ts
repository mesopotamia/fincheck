import {executeActions, replaceValuesInActions} from "../../../helpers/actions";
import updateScoreConfig from '../fixtures/update-score.config';
import getScoreConfig from '../fixtures/get-score-config';
import multipleExtractions from '../fixtures/multiple-extractions-config';


import {init} from "../../../index";
import {extract} from "../../../helpers/extraction";

test('update score', async() => {
    const page = await init(true);
    const extractor = updateScoreConfig.extractor;
    await executeActions(page, updateScoreConfig.actions);
    const result = await extract(page, extractor);
    expect(result).toEqual('Thank you for your order, Joe!');
}, 30000);
test('get score', async() => {
    const page = await init(true);
    const extractor = getScoreConfig.extractor;
    let actions = getScoreConfig.actions;
    const newActions = replaceValuesInActions(actions, {
        username: 'testUser',
        password: 'testPassword'
    });
    await executeActions(page, newActions);
    const result = await extract(page, extractor);
    expect(result).toEqual('785');
}, 15000);
test('test multiple extractions', async() => {
    const page = await init(true);
    const extractor = multipleExtractions.extractor;
    let actions = multipleExtractions.actions;
    await executeActions(page, actions);
    const result = await extract(page, extractor);
    expect(result).toEqual({score: '785', description: 'Excellent'})
});
