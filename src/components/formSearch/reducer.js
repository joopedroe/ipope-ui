import initialState           from './initialState';
import * as reducerGeneratorSearchForm  from './config/reducers';


const INITIAL_STATE = ({
        ...initialState
});

export default (state = INITIAL_STATE, action) => {
  if (reducerGeneratorSearchForm[action.type])
    return reducerGeneratorSearchForm[action.type](state, action);
  else
    return state;
};