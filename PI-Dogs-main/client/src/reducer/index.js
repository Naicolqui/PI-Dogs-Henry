const GET_BREED = "GET_BREED";

let initialState = {
    breed: [],
    temper: []
};

export default function rootReducer(state=initialState, action){
    switch(action.type){
        case GET_BREED:
            return {
                ...state,
                breed: action.payload
            };
        case GET_TEMPER:
            return{
                ...state,
                temper: action.payload
            };
        default:
            return state;
    }
}