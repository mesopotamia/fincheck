import {ActionType} from "../../../typings";

export default {
    "actions": [
        {
            "type": "navigate",
            "url": "http://localhost:8081/equifax/login/index.htm"
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
            "type": "click",
            "selector": "#submitButton"
        },
    ],
    "extractor": {
        "selector": ".bigScore"
    }
}