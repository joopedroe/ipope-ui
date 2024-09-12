const position = ({
    'top-right': {
        vertical: 'top',
        horizontal: 'right'
    },
    'top-left': {
        vertical: 'top',
        horizontal: 'left'
    },
    'bottom-right': {
        vertical: 'bottom',
        horizontal: 'right'
    },
    'bottom-left': {
        vertical: 'bottom',
        horizontal: 'left'
    }
});


export default ({
    search: {
        name: '',
        description: '',
        city: '',
        sections: []
    },
    searches: [],
    snackbar: {
        done: false,
        message: '',
        anchorOrigin: position['bottom-right'],
        autoHideDuration: 1500,
        idMessage: '',
        variant: 'default'
    }
});