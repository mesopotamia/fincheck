export interface Action {
    selector?: string;
    url?: string;
    type?: any;
    value?: string;
}
export enum ActionType {
    click = 'click',
    navigate = 'navigate',
    typeIntoField = 'typeIntoField',
    enter = 'enter'
}
export interface Extractor {
    selector: string;
    type?: ExtractorType.textContent | any,
    propName?: string;
    formatters?: Formatter[];
}
export enum ExtractorType {
    textContent
}
export interface Formatter {
    type: string;
    options?: any;
}
export enum formatterTypes {
    convertToNumber = 'convertToNumber',
    convertToCurrency = 'convertToCurrency'
}