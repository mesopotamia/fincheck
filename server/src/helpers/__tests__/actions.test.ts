import {ActionType} from "../../typings/index";
import {replaceValuesInActions, replaceValuesPerAction} from "../actions";

test('replace value', () => {
    const newAction = replaceValuesPerAction({
        value: '${username}',
        type: ActionType.typeIntoField
    }, 'username101');
    expect(newAction.value).toEqual('username101')
});
test('replace values', () => {
    const actions: any = [
        {
            value: '${username}',
            type: ActionType.typeIntoField
        },
        {
            value: '${password}',
            type: ActionType.typeIntoField
        },
        {
            selector: 'selector',
            type: ActionType.navigate,
        }
    ];
    expect(replaceValuesInActions(actions, {
        username: 'myUsername',
        password: 'myPassword'
    })).toEqual([
        {
            value: 'myUsername',
            type: ActionType.typeIntoField
        },
        {
            value: 'myPassword',
            type: ActionType.typeIntoField
        },
        {
            selector: 'selector',
            type: ActionType.navigate,
        }
    ]);
});