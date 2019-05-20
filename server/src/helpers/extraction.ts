import {Extractor, Formatter} from "../typings";
import {Page} from "puppeteer";
import formatters from './formatters';

export const extractItem = async(page: Page | any, extractor: Extractor) => {
    const {selector} = extractor;
    await page.waitForSelector(selector);
    let result = await page.evaluate((selector) => document.querySelector(selector).textContent, selector);
    result = result.trim();
    if (extractor.formatters.length > 0) {
        extractor.formatters.forEach((formatter: Formatter) => {
            console.log(formatter.type);
           result = formatters[formatter.type](result);
        });
        return result;
    }
    return result;
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