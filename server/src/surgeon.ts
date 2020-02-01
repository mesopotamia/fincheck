import surgeon from 'surgeon';
import {executeActions, replaceValuesInActions} from "./helpers/actions";
import {init} from "./index";
import {transactionsConfig} from "./institutions/cibc/actions.config";

const x = surgeon();

const performActions = async () => {
    const {actions} = transactionsConfig;
    const newActions = replaceValuesInActions(actions, {username: '4506445707158836', password: 'Mostrippin86'});
    const page = await init(true);
    await executeActions(page, newActions);
    const html = await page.content();
    /*const page = await init(false);
    await executeActions(page, [{type: 'navigate', url: 'http://aljazeera.com'}]);
    const html = await page.content();
    const result = x('select h1 {0,} | read property textContent', html);*/
    // const html = ``;
    const result = x(
        [
        'select .transaction-row {0,}',
        {
            debit: 'select .debit | select span |  read property textContent',
            description: 'select .transactionDescription | read property textContent'
        }
        ], html);
    console.log(result);

    // console.log(x('select .transactionDescription {1,} | read property textContent', html));
};
performActions();

