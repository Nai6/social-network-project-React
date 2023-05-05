import {applyMiddleware, combineReducers, compose, legacy_createStore as createStore} from "redux";
import authReducer from "./auth_reducer";
import dialogReducer from "./dialog_reducer";
import profileReducer from "./profile_reduser";
import userReducer from "./users_reducer";
import ThunkMiddleware from "redux-thunk";
import { reducer as formReducer} from "redux-form" 
import appReducer from "./app_reducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogReducer,
    usersPage: userReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers,composeEnhancers(applyMiddleware(ThunkMiddleware)));

export default store;