import {Page} from "puppeteer";
import {Action, ActionType} from "../typings";

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
export const executeActions = async (page: Page, actions: Action[]) => {
    for (const action of actions) {
        switch (action.type) {
            case ActionType.navigate:
                await navigate(page, action.url);
                break;
            case ActionType.click:
                await navigateByClick(page, action.selector);
                break;
        }
    }
};
