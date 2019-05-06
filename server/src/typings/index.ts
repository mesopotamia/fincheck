export interface Action {
    selector?: string;
    url?: string;
    type?: any
}
export interface ClickAction extends Action{
    type: ActionType.click;
    selector: string;
}
export interface NavigateAction extends Action{
    type: ActionType.navigate
    url: string;
}
export interface TypeIntoFieldAction extends Action {
    value: string;
    type: ActionType.typeIntoField
}
export enum ActionType {
    click = 'click',
    navigate = 'navigate',
    typeIntoField = 'typeIntoField'
}
export interface TextExtractor {
    selector: string;
    type: ExtractorType.textContent
}
export interface Extractor {
    selector: string;
    type: ExtractorType.textContent | any
}
export enum ExtractorType {
    textContent
}
