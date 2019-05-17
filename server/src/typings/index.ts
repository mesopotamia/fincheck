export interface Action {
    selector?: string;
    url?: string;
    type?: any;
    value?: string;
}
export enum ActionType {
    click = 'click',
    navigate = 'navigate',
    typeIntoField = 'typeIntoField'
}
export interface Extractor {
    selector: string;
    type?: ExtractorType.textContent | any,
    propName?: string;
}
export enum ExtractorType {
    textContent
}
