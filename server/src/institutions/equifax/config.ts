import {ActionType} from "../../typings";

export const updateScore = {
    actions: [
        {
            type: "navigate",
            url: "https://www.econsumer.equifax.ca/canadaotc/showmyequifax.ehtml?locale_code=en_ca&_ga=2.19025976.1079285246.1555198618-331063922.1555198618"
        },
        {
            selector: '#userName',
            type: ActionType.typeIntoField,
            value: '${username}'
        },
        {
            selector: '#consumerPwd',
            type: ActionType.typeIntoField,
            value: '${password}'
        },
        {
            type: "enter"
        },
    ],
    extractor: [
        {
            selector: ".bigScore",
            propName: 'score'
        },
        {
            selector: ".bigScoreDesc",
            propName: 'description'
        }
    ]
};
