
import types from './constants';
import {getListSearches, createSearch, getSearchById, updateSearchSections} from '../../../services/search';

export const setFormSearch = data => ({
    type: types.SET_FORM_SEARCH,
    payload: data
});

export const setNewField = data => ({
    type: types.SET_NEW_FIELD,
    payload: data
});

export const setSearches = data => ({
    type: types.SET_SEARCHES,
    payload: data
});


export const getSearch = (id) => (
    async (dispatch, getState) => {

        const response = await getSearchById(id);
        dispatch(setFormSearch(response.data));
    }
);

export const getSearches = () => (
    async (dispatch, getState) => {
        const response = await getListSearches();
        dispatch(setSearches(response.data||[]));
    }
);

export const createNewSearch = (params) => (
    async (dispatch, getState) => {
        const state = getState();
        const searches = state.formSearch.searches;
        const response = await createSearch(params);
        console.log(response);
        dispatch(setSearches([...searches, {...params, id:response.data}]));
    }
);

export const updateSearch = (id, params) => (
    async (dispatch, getState) => {
        const state = getState();
        const search = state.formSearch.search;
        const response = await updateSearchSections(search.id,{ sections:search.sections });
        console.log(response);
    }
);
