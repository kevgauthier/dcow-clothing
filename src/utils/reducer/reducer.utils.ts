import { AnyAction } from "redux";

/** OVERLOAD FUCNRTION TYPE utility for enhancing Redux action creators with additional properties for improved type safety.   */
type Matchable<AC extends () => AnyAction> = AC & {
    type: ReturnType<AC>['type'];
    match(action: AnyAction): action is ReturnType<AC>;
}

export function withMatcher<AC extends () => AnyAction & { type: string }>(actionCreator: AC): Matchable<AC>;

export function withMatcher<AC extends (...args: any[]) => AnyAction & {type: string}>(actionCreator: AC): Matchable<AC>;

export function withMatcher(actionCreator: Function) {
    const type = actionCreator().type;
    return Object.assign(actionCreator, {
        type,
        match(action: AnyAction) {
            return action.type === type;
        }
    });
}
/** end generatic function for the action types */

export type ActionWithPayload<T, P> = {
    type: T;
    payload: P;
};

export type Action<T> = {
    type: T;
}; 

export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;
export function createAction<T extends string>(type: T, payload: void): Action<T>;

export function createAction<T extends string, P>(type: T, payload: P){
    return { type, payload };
}