export default {
    "actions": [
        {
            "type": "navigate",
            "url": "https://www.cibc.com/en/personal-banking.html"
        },
        {
            "type": "typeIntoField",
            "selector": "#blq-content > div:nth-child(3) > div:nth-child(2) > div > div.full-bleed-position > div > div > div.column.large-3.medium-3.small-12.hide-for-medium-only.hide-for-small-only.large-offset-1.end.opacity-100.bg-cover > div > div > div > div.desktop.color-bg-global-2.small-12 > form > div.card-number input",
            "value": "${username}"
        },
        {
            "type": "typeIntoField",
            "selector": "#blq-content > div:nth-child(3) > div:nth-child(2) > div > div.full-bleed-position > div > div > div.column.large-3.medium-3.small-12.hide-for-medium-only.hide-for-small-only.large-offset-1.end.opacity-100.bg-cover > div > div > div > div.desktop.color-bg-global-2.small-12 > form > div.password input",
            "value": "${password}"
        },
        {
            "type": "click",
            "selector": "#blq-content > div:nth-child(3) > div:nth-child(2) > div > div.full-bleed-position > div > div > div.column.large-3.medium-3.small-12.hide-for-medium-only.hide-for-small-only.large-offset-1.end.opacity-100.bg-cover > div > div > div > div.desktop.color-bg-global-2.small-12 > form > div.buttons > div:nth-child(2) button"
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