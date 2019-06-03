import {Page} from "puppeteer";
import {Action, ActionType} from "../typings";


export const navigate = async (page: Page, url: string) => {
    await page.goto(url, {
        waitUntil: "networkidle2"
    });
};
export const pressEnter = async(page) => {
    await Promise.all([
        page.waitForNavigation({waitUntil: "networkidle2"}),
        page.keyboard.press('Enter')
    ]);
};
export const navigateByClick = async (page: Page, selector: string) => {
    await page.waitForSelector(selector);
    const button = await page.$(selector);
    await button.click();
};
export const typeIntoField = async (page: Page, selector: string, value: string) => {
    await page.waitForSelector(selector);
    const field = await page.$(selector);
    await field.type(value);
};
export const waitForDuration = async (page: Page, duration: string) => {
    await page.waitFor(Number(duration));
};
export const executeActions = async(page: Page, actions: Action[]) => {
    for(const action of actions) {
        switch(action.type) {
            case ActionType.navigate:
                await navigate(page, action.url);
                break;
            case ActionType.click:
                await navigateByClick(page, action.selector);
                break;
            case ActionType.typeIntoField:
                await typeIntoField(page, action.selector, action.value);
                break;
            case ActionType.enter:
                await pressEnter(page);
                break;
            case ActionType.waitForDuration:
                await waitForDuration(page, action.value);
                break;
        }
    }
};
export const replaceValuesInActions = (actions: Action[], values: any): Action[] => {
    return actions.map<Action>((action: Action) => {
        if (action.type === ActionType.typeIntoField) {
            if (action.value.search(/\${.*/) > -1) {
                const token = action.value
                    .replace(/\${/, '')
                    .replace(/}/, '');
                return replaceValuesPerAction(action, values[token]);
            }
        }
        return action;
    })
};
export const replaceValuesPerAction = (action: Action, newValue) => {
    action.value = action.value.replace(/\${.*/gm, newValue);
    return action;
};
