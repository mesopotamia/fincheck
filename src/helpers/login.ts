import {ElementHandle, Page} from "puppeteer";

export async function login(
    page: Page,
    username: string,
    password: string,
    usernameHandle: ElementHandle | null,
    passwordHandle: ElementHandle | null
) {
    await usernameHandle.type(username);
    await passwordHandle.type(password);
    console.log('entered credentials');
    await Promise.all([
        page.waitForNavigation({waitUntil: "networkidle2"}),
        page.keyboard.press('Enter')
    ]);
}