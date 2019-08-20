import {Action, ActionType, Extractor} from "../../../../typings";

export const extractor: Extractor = {
    selector: '.listing-details h2',
    isPlural: true
};
export const actions: Action[] = [
    {
        url: 'http://localhost:8081/autotrader',
        type: ActionType.navigate
    }
];
