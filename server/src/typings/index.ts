export interface Action {
    selector?: string;
    url?: string;
    type: ActionType.click | ActionType.navigate
}
export interface ClickAction extends Action{
    type: ActionType.click;
    selector: string;
}
export interface NavigateAction extends Action{
    type: ActionType.navigate
    url: string;
}
export enum ActionType {
    click = 'click',
    navigate = 'navigate'
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
