const GET_BREED = "GET_BREED";

let initialState = {
    breed: []
};

export default function rootReducer(state=initialState, action){
    switch(action.type){
        case GET_BREED:
            return {
                ...state,
                breed: action.payload
            };
        default:
            return state;
    }
}