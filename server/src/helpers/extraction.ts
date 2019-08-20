import {Extractor, Formatter} from "../typings";
import {Frame, Page} from "puppeteer";
import formatters from './formatters';

const applyFormatting = (extractorFormatters: Formatter[] = [], result: string) => {
    extractorFormatters.forEach((formatter: Formatter) => {
        result = formatters[formatter.type](result);
    });
    return result;
};
export const extractItem = async(page: Page | any, extractor: Extractor): Promise<string | string[]> => {
    if (extractor.iFrame) {
        const frames = await page.frames() as Frame[];
        frames.forEach(f => {
            if (f.name() === extractor.iFrame.name) {
                page = f;
            }
        });
    }
    const {selector} = extractor;
    await page.waitForSelector(selector);
    return await getResult(page, extractor);
};
export const getResult = async (page: Page, extractor: Extractor): Promise<string | string[]> => {
    const { selector } = extractor;
    let content = await getContent(page, selector, extractor.isPlural);
    if (typeof content === 'string') {
        content = content.trim();
        return applyFormatting(extractor.formatters, content);
    } else {
        return content.map((item) => {
            return applyFormatting(extractor.formatters, item.trim());
        })
    }

};
export const getContent = async(page: Page, selector: string, isPlural: boolean = false): Promise<string[] | string> => {
    if (isPlural) {
        return await page.$$eval(selector, (item) => item.map((item) => item.textContent));
    }
    return await page.evaluate((selector) => document.querySelector(selector).textContent, selector) ;
};
export const extract = async (page, extractors: Extractor | Extractor[]) => {
    if (Array.isArray(extractors)) {
        const finalExtraction = {};
        for(let extractor of extractors) {
            finalExtraction[extractor.propName] = await extractItem(page, extractor);
        }
        return finalExtraction;
    } else {
        return await extractItem(page, extractors);
    }
};