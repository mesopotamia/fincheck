import {Action, Extractor} from "../../typings";

export const actions: Action[] = [
    {
        type: 'navigate',
        url: 'https://authentication.td.com/uap-ui/index.html?consumer=easyweb&locale=en_CA#/login/easyweb-getting-started'
    },
    {
        type: "typeIntoField",
        selector: "#username100",
        value: "${username}"
    },
    {
        type: "typeIntoField",
        selector: "#password",
        value: "${password}"
    },
    {
        type: 'click',
        selector: '#loginForm > div > div > div.td-row > div > div > button'
    },
    {
        type: 'waitForDuration',
        value: '5000'
    }
];
export const extractor: Extractor[] = [
    {
        iFrame: {
            name: 'tddetails'
        },
        selector: '#td-layout-contentarea > div.td-layout-column.td-layout-grid12.td-layout-column-last div > div.td-layout-column.td-layout-grid12 > div > table:nth-child(1) > tbody > tr:nth-child(2) td',
        propName: 'assets',
        formatters: [{type: 'convertToNumber'}]
    },
    {
        iFrame: {
            name: 'tddetails'
        },
        selector: '.td-table.td-table-border-row.td-table-border-column.td-table-stripe-row-white.td-table-hover-row:nth-child(2) tr:nth-child(2) td',
        propName: 'liabilities',
        formatters: [{type: 'convertToNumber'}]
    }
];