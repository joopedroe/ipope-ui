import React, { useState } from 'react';

import Grid from '@mui/material/Grid';
import TextField from './InputText';
import RadioOrCheck from './RadioOrCheckbox';
import CheckOnly from './CheckOnly';


//import style from './style';


const ManagerInputComponent = (props) => {

    const {
      dataType,
      title,
      measurementUnit,
      displayName,
      classes,
      isModelField,
      fieldState,
      setNewField,
    } = props;

    const getFields = () => {
        return {
          1:{
            component: RadioOrCheck,
            props: { label: 'Título', type: 'checkbox' },
          },
          2: {
            component: RadioOrCheck,
            props: { label: 'Título', type: 'radio' },
          },
          3: { 
            component: TextField, 
            props: { label: 'Título' } },
          4: { 
            component: RadioOrCheck, 
            props: { label: 'Título', type: 'inputText' } } ,
        };
      };
    
    const onChangeTitle = (event) => {
        const { value } = event.target;
        setFieldTitle({ title: value });
      };

    const fields = getFields();
    const field = fields[dataType];

    return (
        <Grid container>
          <Grid item xs={12}>
            <field.component
              {...field.props}
              field ={fieldState}
              setNewField={setNewField}
              inputProps={{
                onChange: onChangeTitle,
                disabled: isModelField,
              }}
            />
          </Grid>
        </Grid>
    );
  }

  export default ManagerInputComponent;



