import {combineReducers} from "redux";
import {loginReducer} from "./loginReducer";
import {dataReducer} from "./dataReducer";

export const rootReducer = combineReducers({
    loginReducer: loginReducer,
    dataReducer: dataReducer
});
