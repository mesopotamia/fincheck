import {Extractor, ExtractorType, formatterTypes} from "../../typings";
import {extractItem} from "../extraction";
import {frameSpy, pageMock} from "../__mocks__/page";

test('apply formatting to extractor', async() => {
    const extractor: Extractor = {
        selector: 'whatever',
        formatters: [{type: formatterTypes.convertToNumber}, {type: formatterTypes.convertToCurrency}],
        propName: 'prop1',
        type: ExtractorType.textContent
    };
    const spy = spyOn(pageMock, 'evaluate').and.returnValue(Promise.resolve('$1000'));
    const result = await extractItem(pageMock, extractor);
    expect(result).toEqual('$1,000');
    afterAll(() => {
        spy.calls.reset();
    })
});
xtest('get page from iFrame', async() => {
    const extractor: Extractor = {
        selector: 'whatever',
        formatters: [{type: formatterTypes.convertToNumber}, {type: formatterTypes.convertToCurrency}],
        propName: 'prop1',
        type: ExtractorType.textContent,
        iFrame: {
            name: 'testIFrame'
        }
    };
    const spy1 = spyOn(pageMock, 'evaluate').and.returnValue(Promise.resolve('$1000'));
    const spy2 = spyOn(frameSpy, 'name').and.returnValue('testIFrame');
    const spy3 = spyOn(pageMock, 'frames').and.returnValue([spy2]);
    afterAll(() => {
        spy1.calls.reset();
        spy3.calls.reset();
    })
});