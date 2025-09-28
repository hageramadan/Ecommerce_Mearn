
const INITIAL_STATE = {
    token: null,
    error: null
}

export default function loginReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case "GET_TOKEN":
            return {
                ...state,
                token: action.payload,
                error: null
            }
        case "TOKEN_ERROR":
            return {
                ...state,
                token: null,
                error: action.payload
            }
        default:
            return state
    }
}