import {executeActions, extract, replaceValuesInActions} from "../../../helpers/actions";
import updateScoreConfig from '../fixtures/update-score.config';
import getScoreConfig from '../fixtures/get-score-config';


import {init} from "../../../index";

test('update score', async() => {
    const page = await init(true);
    const extractor = updateScoreConfig.extractor;
    await executeActions(page, updateScoreConfig.actions);
    const result = await extract(page, extractor.selector);
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
    const result = await extract(page, extractor.selector);
    expect(result).toEqual('785');
}, 15000);
