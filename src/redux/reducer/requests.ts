import RootAction from "../action";
import { Requests } from "../state";

export default function requests(state: Requests, actions: RootAction): Requests {
    switch(actions.type){
        default:
            return state;
    }
}
