export const SET_FORM_SEARCH_RESULT = (state, action) => {
  return ({
    ...state,
    searchResult: action.payload,
  });
};

export const SET_RESULT_FIELD = (state, action) => {

  return ({
    ...state,
    results:{
      ...state.results,
      [action.payload.id]: action.payload.resultField
    }
  });
}

export const SET_RESULT_FIELD_MAPS = (state, action) => {
  return ({
    ...state,
    resultsMaps: action.payload,
  });
}

export const SET_SECTORS_SEARCH = (state, action) => {
  return ({
    ...state,
    sectors: action.payload,
  });
}