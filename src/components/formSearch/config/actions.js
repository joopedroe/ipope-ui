import { Modal } from 'antd';
import types from './constants';
import {getListSearches, createSearch, getSearchById, updateSearchSections, duplicateSearchById, deleteSearchById } from '../../../services/search';

const ModalConfirm = Modal.confirm;

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

export const showSnackbar = data => ({
    type: types.SNACKBAR_SHOW,
     payload: data 
})


export const getSearch = (id) => (
    async (dispatch, getState) => {

        const response = await getSearchById(id);
        dispatch(setFormSearch(response.data));
    }
);

export const duplicateSearch = (id) => (
    async (dispatch, getState) => {
        try {
            const response = await duplicateSearchById(id);
            dispatch(getSearches());
            dispatch(showSnackbar({
                message: 'Duplicado com sucesso!',
                autoHideDuration: 1500,
                variant: 'success'
            }));
        } catch (error) {
            dispatch(showSnackbar({
                message: 'Erro ao duplicar!',
                autoHideDuration: 1500,
                variant: 'error'
            }));
        }
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

export const updateNameSearch = (id, params) => (
    async (dispatch, getState) => {
        try {
            const response = await updateSearchSections(id, params);
            dispatch(getSearches());
            dispatch(showSnackbar({
                message: 'Atualizado com sucesso!',
                autoHideDuration: 1500,
                variant: 'success'
            }));
        } catch (error) {
            dispatch(showSnackbar({
                message: 'Erro ao duplicar!',
                autoHideDuration: 1500,
                variant: 'error'
            }));
        }
        
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

export const deleteSearch = (id) => (
    async (dispatch, getState) => {
        const state = getState();
        ModalConfirm({
            centered: true,
            maskClosable: true,
            title: 'Atenção',
            content: `Tem certeza de que deseja excluir esta pesquisa?`,
            cancelText: 'Cancelar',
            okText: 'Excluir',
            onOk: async () => {
                await deleteSearchById(id);
                const searches = state.formSearch.searches;
                const newSearches = searches.filter((item) => item.id !== id);
                dispatch(setSearches(newSearches));
            },
            onCancel: () => {
              return;
            },
          });

    }
);

let timeout = null;

export const hideSnackbar = () => (dispatch, getState, api) => {
  clearTimeout(timeout);
  dispatch(({ type: types.SNACKBAR_HIDE }));
};

