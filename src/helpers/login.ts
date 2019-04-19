import {ElementHandle, Page} from "puppeteer";

export async function login(
    page: Page,
    url: string,
    username: string,
    password: string,
    usernameSelector: ElementHandle | null,
    passwordSelector: ElementHandle | null
) {
    /*await page.setViewport({width: 1375, height: 1000});
    await page.goto(url, {waitUntil: "networkidle2"});*/
    const usernameField = usernameSelector;
    await usernameField.type(username);
    const passwordField = passwordSelector;
    await passwordField.type(password);
    console.log('entered credentials');
    await Promise.all([
        page.waitForNavigation({waitUntil: "networkidle2"}),
        page.keyboard.press('Enter')
    ]);
    // return page.waitForNavigation();
}
export async function logout (page: Page, logoutButton: ElementHandle) {
    await Promise.all([
        page.waitForNavigation({waitUntil: "networkidle2"}),
        await logoutButton.click()
    ])
}