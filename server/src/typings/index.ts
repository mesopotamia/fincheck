export type Action = {
    selector?: string;
    url?: string;
    type?: any;
    value?: string;
}
export enum ActionType {
    click = 'click',
    navigate = 'navigate',
    typeIntoField = 'typeIntoField',
    enter = 'enter',
    waitForDuration = 'waitForDuration'
}
export type Extractor = {
    selector: string;
    type?: ExtractorType.textContent | any,
    propName?: string;
    formatters?: Formatter[];
    isPlural?: boolean;
    iFrame?: {
      name?: string;
      url?: string;
    }
}
export enum ExtractorType {
    textContent
}
export type Formatter = {
    type: string;
    options?: any;
}
export enum formatterTypes {
    convertToNumber = 'convertToNumber',
    convertToCurrency = 'convertToCurrency'
}