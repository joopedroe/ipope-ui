import {getResultField, getResultFieldMaps, getSearchById, getSectorsSearch} from "../../../services/search";
import types from "./constants";


export const setFormSearch = data => ({
  type: types.SET_FORM_SEARCH_RESULT,
  payload: data
});

const setResultField = data => ({
  type: types.SET_RESULT_FIELD,
  payload: data
});

const setResultFieldMaps = data => ({
  type: types.SET_RESULT_FIELD_MAPS,
  payload: data
});

const setSectorsSearch = data => ({
  type: types.SET_SECTORS_SEARCH,
  payload: data
});

export const getSearch = (id) => (
  async (dispatch, getState) => {

    const response = await getSearchById(id);
    dispatch(setFormSearch(response.data));
    dispatch(getResults(response.data, null));

  }
);

export const getResults = (data, sector) => (
  async (dispatch, getState) => {
    for (const sections of data.sections) {
      for (const field of sections.fields) {
        try {
          const response = await getResultField(data.id, field.id, sector);
          const resultField = []
          response.data.names.map((name, index) => {
            const result = {label: name, value: response.data.values[index]};
            resultField.push(result);
          })
          dispatch(setResultField({id: field.id, resultField}));
        } catch (erro) {
          console.error(`Erro ao requisitar: ${erro.message}`);
        }
      }
    }
  }
);

export const getResultsMaps = (data) => (
  async (dispatch, getState) => {
    try {
      const response = await getResultFieldMaps(data.searchId, data.fieldId);

      dispatch(setResultFieldMaps(response.data));
    } catch (erro) {
      console.error(`Erro ao requisitar: ${erro.message}`);
    }
  }
);

export const getSectors = (searchId) => (
  async (dispatch, getState) => {
    try {
      const response = await getSectorsSearch(searchId);

      dispatch(setSectorsSearch(response.data.data));
    } catch (erro) {
      console.error(`Erro ao requisitar: ${erro.message}`);
    }
  }
);