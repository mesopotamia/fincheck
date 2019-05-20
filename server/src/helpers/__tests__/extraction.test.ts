import {Extractor, ExtractorType, formatterTypes} from "../../typings";
import {extractItem} from "../extraction";
import {pageMock} from "../__mocks__/page";

test('apply formatting to extractor', async() => {
    const extractor: Extractor = {
        selector: 'whatever',
        formatters: [{type: formatterTypes.convertToNumber}, {type: formatterTypes.convertToCurrency}],
        propName: 'prop1',
        type: ExtractorType.textContent
    };
    spyOn(pageMock, 'evaluate').and.returnValue(Promise.resolve('$1000'));
    const result = await extractItem(pageMock, extractor);
    expect(result).toEqual('$1,000');
});