import {Page} from "puppeteer";
import {Action, ActionType, TypeIntoFieldAction} from "../typings";

export const extract = async (page, selector) => {
    await page.waitForSelector(selector);
    return await page.evaluate(
        (selector) => document.querySelector(selector).textContent
        , selector);
};
export const navigate = async (page: Page, url: string) => {
    await page.goto(url, {
        waitUntil: "networkidle2"
    });
};
export const navigateByClick = async (page: Page, selector: string) => {
    await page.waitForSelector(selector);
    await page.evaluate((selector) => {
        document.querySelector(selector).click();
    }, selector)
};
export const typeIntoField = async (page: Page, selector: string, value: string) => {
    await page.waitForSelector(selector);
    await page.evaluate((selector, value) => {
        document.querySelector(selector).value = value;
    }, selector, value)
};
export const executeActions = async(page: Page, actions: Action[]) => {
    for(const action of actions) {
        console.log(ActionType.navigate);
        console.log('crawling action', action.type);
        if (action.type === ActionType.navigate) {
            await navigate(page, action.url);
        } else if (action.type === ActionType.click) {
            await navigateByClick(page, action.selector)
        } else if (action.type === ActionType.typeIntoField) {
            const a = action as TypeIntoFieldAction;
            console.log('type action', a);
            await typeIntoField(page, a.selector, a.value);
        }
    }
};
