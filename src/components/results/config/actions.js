import {getResultField, getSearchById} from "../../../services/search";
import types from "./constants";


export const setFormSearch = data => ({
  type: types.SET_FORM_SEARCH_RESULT,
  payload: data
});

const setResultField = data => ({
  type: types.SET_RESULT_FIELD,
  payload: data
});

export const getSearch = (id) => (
  async (dispatch, getState) => {

    const response = await getSearchById(id);
    dispatch(setFormSearch(response.data));
    dispatch(getResults(response.data));

  }
);

 const getResults = (data) => (
  async (dispatch, getState) => {
    for (const sections of data.sections) {
      for (const field of sections.fields) {
        try {
          const response = await getResultField(data.id, field.id);
          const resultField = []
          response.data.names.map((name,index) => {
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