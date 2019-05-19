import {Extractor, ExtractorType, formatterTypes} from "../../typings";
import {extractItem} from "../extraction";

test('apply formatting to extractor', async() => {
    const extractor: Extractor = {
        selector: 'whatever',
        formatters: [{type: formatterTypes.convertToNumber}, {type: formatterTypes.convertToCurrency}],
        propName: 'prop1',
        type: ExtractorType.textContent
    };
    const mockPage = {
        waitForSelector: () => Promise.resolve('whatever'),
        evaluate: () => Promise.resolve('$1000')
    };
    const result = await extractItem(mockPage, extractor);
    expect(result).toEqual('$1,000');
});