
import types from './constants';

export const setFormSearch = data => ({
    type: types.SET_FORM_SEARCH,
    payload: data
});

export const setNewField = data => ({
    type: types.SET_NEW_FIELD,
    payload: data
});

export const setSearchs = data => ({
    type: types.SET_SEARCHS,
    payload: data
});


export const getSearchById = (id) => (
    async (dispatch, getState) => {
        const searchs = getState().formSearch.searchs;
        const search = searchs.find(s => s.id === id);
        dispatch(setFormSearch(search));
    }
);
