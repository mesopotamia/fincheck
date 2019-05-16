import {ActionType} from "../../../typings";

export default {
    "actions": [
        {
            "type": "navigate",
            "url": "http://localhost:8080/login/index.htm"
        },
        {
            selector: '#userName',
            type: ActionType.typeIntoField,
            value: 'testUser'
        },
        {
            selector: '#consumerPwd',
            type: ActionType.typeIntoField,
            value: 'testPassword'
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