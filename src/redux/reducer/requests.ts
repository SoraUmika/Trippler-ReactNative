import RootAction from "../action";
import { Requests } from "../state";
import { update } from "../../util/object";

export default function requests(state: Requests, action: RootAction): Requests {
    switch(action.type){
        case 'requests/RAND_BUSSINESS':
            return Object.assign({}, state, {
                grab_random_bussiness: {isFetching: true, err: "No Error", data: {}}
            })

        case "receive/RAND_BUSSINESS":
            return Object.assign({}, state, {
                grab_random_bussiness: {isFetching: false, err: "No Error", data: action.payload}
            })
        
        case "error/RAND_BUSSINESS":
            return Object.assign({}, state, {
                grab_random_bussiness: {isFetching: false, err: action.payload, data: {}}
            })
        default:
            return state;
    }
}
