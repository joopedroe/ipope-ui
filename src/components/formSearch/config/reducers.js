import { v4 as uuidv4 } from 'uuid';

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

export const SET_SEARCHES = (state, action) => {
    return ({
        ...state,
        searches: action.payload,
    });
}

export const SNACKBAR_SHOW = (state, action) => {
    const { message, variant, placement, autoHideDuration, ...rest } = action.payload;
    let _variant = variant || 'default';
    let _autoHideDuration = (_variant === 'default') ? 1500 : autoHideDuration;

    return ({
        ...state,
        snackbar: {
            ...state.snackbar,
            done: true,
            idMessage: uuidv4(),
            message,
            variant: _variant,
            autoHideDuration: _autoHideDuration,
            ...rest
        }
    });
}


export const SNACKBAR_HIDE = (state, action) => {
    return ({
        ...state,
        snackbar: {
            ...state.snackbar,
            done: false
        }
    });
}