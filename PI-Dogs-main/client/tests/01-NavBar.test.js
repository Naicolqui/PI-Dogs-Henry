import rootReducer from '../src/redux/reducer';


describe('Reducer', () => {
   const initialState = {
    breed: [],
    tempers: [],
    savedBreed: [],
    breedDetail: [],
    loader: true
   };

   it('Debería retornar el estado inicial si no se pasa un type válido', () => {
      expect(rootReducer(undefined, [])).toEqual({
        breed: [],
        tempers: [],
        savedBreed: [],
        breedDetail: [],
        loader: true
      });
   });
});