const GET_BREED = "GET_BREED";
const GET_TEMPER = "GET_TEMPER";
const FILTER_BY_TEMPER = "FILTER_BY_TEMPER";
const GET_BY_ORIGIN = "GET_BY_ORIGIN";
const GET_BY_NAME = "GET_BY_NAME"

let initialState = {
    breed: [],
    temper: [],
    savedBreed: [],
    loader: true
};

export default function rootReducer(state=initialState, action){
    switch(action.type){
        case GET_BREED:
            return {
                ...state,
                breed: action.payload,
                savedBreed: action.payload
            };
        case GET_TEMPER:
            return{
                ...state,
                temper: action.payload
            };
        case FILTER_BY_TEMPER:
            const breeds = state.savedBreed;
            const filteredBreed = action.payload ==='all' ? breeds : breeds.filter(b =>{
                if(typeof b.temper === 'string'){
                    return b.temper.includes(action.payload);
                }
                // if(Array.isArray(b.temper)){
                //     let temperaments = b.temper.map(el=>el.name);
                //     return temperaments.includes(action.payload);
                // }
                return true;
            })
            return {
                ...state,
                breed: filteredBreed
            };
        case GET_BY_ORIGIN:
            const breedsByOrigin = state.savedBreed;
            const filteredBreedByOrigin = action.payload === 'db' ? breedsByOrigin.filter(b => b.CreatedInDB) : breedsByOrigin.filter(b => !b.CreatedInDB);
            return {
                ...state,
                breed: action.payload === 'all' ? breedsByOrigin : filteredBreedByOrigin
            };
        case GET_BY_NAME:
            const breedsName = state.savedBreed;
            const filteredBreedByName = action.payload === 'A-Z' ? breedsName.sort(function (a,b){
                if(a.name>b.name) return 1;
                if(a.name<b.name) return -1;
                else return 0;
            }) :
            breedsName.sort(function (a,b){
                if(a.name>b.name) return -1;
                if(a.name<b.name) return 1;
                else return 0;
            })
            return {
                ...state,
                breed: filteredBreedByName
            };

        default:
            return state;
    }
}