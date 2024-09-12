import React from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';

import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import * as actions  from '../formSearch/config/actions';

const  CustomizedSnackbars = (props) => {
 
  const { hideSnackbar, snackbarState = {} } = props;
    const { done, message, anchorOrigin, idMessage, autoHideDuration, variant } = snackbarState;


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    hideSnackbar()
  };

  return (
    <div>
      <Snackbar open={done} autoHideDuration={autoHideDuration} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={variant}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}




const mapStateToProps = state => ({
  snackbarState : state.formSearch.snackbar
});

const mapDispatchToProps = dispatch => bindActionCreators({
  hideSnackbar: actions.hideSnackbar
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(CustomizedSnackbars);