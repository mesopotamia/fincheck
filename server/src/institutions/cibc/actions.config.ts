export default {
    "actions": [
        {
            "type": "navigate",
            "url": "https://www.cibc.com/en/personal-banking.html"
        },
        {
            "type": "typeIntoField",
            "selector": "#blq-content > div:nth-child(3) form > div.card-number input",
            "value": "${username}"
        },
        {
            "type": "typeIntoField",
            "selector": "#blq-content > div:nth-child(3) form > div.password input",
            "value": "${password}"
        },
        {
            "type": "click",
            "selector": "#blq-content > div:nth-child(3) button"
        }
    ],
    "extractor": [
        {
            "selector": ".panels.box div:nth-child(3) .detail-container .category-balance",
            "propName": "liabilities",
            formatters: [{type: 'convertToNumber'}]
        },
        {
            "selector": ".panels.box div:nth-child(2) .detail-container .category-balance",
            "propName": "assets",
            formatters: [{type: 'convertToNumber'}]
        }
    ]
}

export const transactionsConfig = {

    "actions": [
        {
            "type": "navigate",
            "url": "https://www.cibc.com/en/personal-banking.html"
        },
        {
            "type": "typeIntoField",
            "selector": "#blq-content > div:nth-child(3) form > div.card-number input",
            "value": "${username}"
        },
        {
            "type": "typeIntoField",
            "selector": "#blq-content > div:nth-child(3) form > div.password input",
            "value": "${password}"
        },
        {
            "type": "click",
            "selector": "#blq-content > div:nth-child(3) button"
        },
        {
            "type": "click",
            "selector": ".account-name"
        },
        {
            "type": "click",
            "selector": ".option-bar li:nth-child(3)"
        },
        {
            "type": "waitForDuration",
            "value": "2000"
        }
    ],
    "extractor": [
        {
            "selector": "tbody .transactions .transactionDescription",
            "isPlural": true,
            "propName": "transactions"
        }
    ]
};