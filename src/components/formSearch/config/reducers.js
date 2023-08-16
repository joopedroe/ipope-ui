export const SET_FORM_SEARCH = (state, action) => {
    return ({
        ...state,
        search: action.payload,
    });
};

export const SET_NEW_FIELD = (state, action) => {
    return ({
        ...state,
        field: state.field,
    });
}

export const SET_SEARCHS = (state, action) => {
    return ({
        ...state,
        searchs: action.payload,
    });
}