import { createStore } from "redux";

interface Action {
    type: string,
    data: any
}

export interface IAppState {
    alertMsg: string
}

export const appStore = createStore(reducer);

const ACT_ALERT = "ACT_ALERT";
export function generateAlertAction(msg: string): Action {
    return {type: ACT_ALERT, data: msg};
}
function alert(state:IAppState, action:Action): IAppState {
    console.log('Enter alert');
    return Object.assign({}, state, {alertMsg: action.data})
}

function reducer(state: IAppState, action: Action) {
    console.log("Reducer: " + JSON.stringify(action))
    switch(action.type) {
        case ACT_ALERT: return alert(state, action);
        default: return state;
    }
} 