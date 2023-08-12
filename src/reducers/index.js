import { combineReducers } from 'redux';
import FormSearchReducer from '../components/formSearch/reducer';


const createRootReducer = () =>
  combineReducers({
    formSearch: FormSearchReducer,
  });

export default createRootReducer;
