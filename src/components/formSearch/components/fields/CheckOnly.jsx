import React, {useState, useEffect}   from 'react';

import Grid                           from '@mui/material/Grid';
import Checkbox                       from '@mui/material/Checkbox';
import TextField                      from '@mui/material/TextField';
//import style                          from './style';

function CheckOnly( props ) {
  const {classes, label, inputProps, getField, setFieldCheckPoints, iconHelper} = props;
  const [checked, setChecked] = useState(false);
  const [points, setPoints] = useState(false);

  if(getField.points !== null && !points) setPoints(true);

  useEffect(() => {
    points ? setChecked(true) : setChecked(false);
  }, [points]);

  useEffect(() => {
    setFieldCheckPoints({checkPoints: checked});
  }, [checked]);

  const onChangePointBox = e => {
    setChecked(e.target.checked);;
  }
  
  return (
    <Grid container>
      {
      checked ?
        <Grid container>
          <Grid item xs={10} className={classes.containerCheckOnly}>
            <Checkbox disabled classes={{root: classes.overrideRootCheckOnly}} />
            <TextField label={label} inputProps={inputProps} iconHelper={iconHelper} />
          </Grid>
        </Grid>
      : 
        <Grid item xs={12} className={classes.containerCheckOnly}>
          <Checkbox disabled classes={{root: classes.overrideRootCheckOnly}} />
          <TextField label={label} inputProps={inputProps} iconHelper={iconHelper} />
        </Grid>
      }

      <Grid container className={classes.checkboxPointsContainer}>
        <Checkbox onChange={onChangePointBox} checked={checked}>
          Adicionar pontos
        </Checkbox>
      </Grid>
    </Grid>
  );
};

export default CheckOnly;
