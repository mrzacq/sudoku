const initialState = {
    boards: []
}

export default function boardReducer(state = initialState, action){
    switch (action.type) {
        case "LOCK_BOARD":
            return {...state, boards: action.payload}
        default:
            return state
    }
}