import { combineReducers } from 'redux';
import FormSearchReducer from '../components/formSearch/reducer';
import ResultSearchReducer from '../components/results/reducer';


const createRootReducer = () =>
  combineReducers({
    formSearch: FormSearchReducer,
    results: ResultSearchReducer
  });

export default createRootReducer;
