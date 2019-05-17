import {Extractor} from "../typings";
import {Page} from "puppeteer";

const extractItem = async(page: Page, extractor: Extractor) => {
    const {selector} = extractor;
    await page.waitForSelector(selector);
    return await page.evaluate((selector) => document.querySelector(selector).textContent, selector);
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