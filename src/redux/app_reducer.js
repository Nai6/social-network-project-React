import { getUserData } from "./auth_reducer";

const INITIALIZE_SUCCEESS = 'APP/INITIALIZE_SUCCEESS'


let initialState = {
    initialized: false,
}
const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZE_SUCCEESS: {
            return {
                ...state,
                initialized: true,
            }
        }
        default:
            return state;
    }
}

export const initializeSucceess = () => ({ type: INITIALIZE_SUCCEESS })

export const initializeApp = () => {
    return (dispatch) => {
        let promise = dispatch(getUserData())
        Promise.all([promise])
            .then(() => {
                dispatch(initializeSucceess())
            })
    }
}

export default appReducer;