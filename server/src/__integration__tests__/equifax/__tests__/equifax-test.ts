import {executeActions, extract} from "../../../helpers/actions";
import config from '../fixtures/actions.config';
import {init} from "../../../index";

test('get score', async() => {
    const page = await init();
    const extractor = config.extractor;
    await executeActions(page, config.actions);
    const result = await extract(page, extractor.selector);
    expect(result).toEqual('Thank you for your order, Joe!');
});
