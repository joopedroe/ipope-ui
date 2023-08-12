
import types from './constants';

export const setFormSearch = data => ({
    type: types.SET_FORM_SEARCH,
    payload: data
});

export const setNewField = data => ({
    type: types.SET_NEW_FIELD,
    payload: data
});
