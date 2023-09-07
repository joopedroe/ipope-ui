import {useCallback, useState, useEffect} from 'react';
import {

  Box, Button, IconButton, SvgIcon, Typography, Unstable_Grid2 as Grid,
} from '@mui/material';
import {getSearch} from "../../config/actions";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faTrashAlt} from "@fortawesome/free-regular-svg-icons";
import {InputActions} from "../../../formSearch/container/style";
import {Button as ButtonAntd} from "antd";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import Icon from "../../../iconify/Iconify";
import { Graphic } from "../graphic"


export const Results = (props) => {
  const dispatch = useDispatch();
  const {id} = useParams();

  const search = useSelector(state => state.results.searchResult);


  const renderField = (field) => {
    switch (field.dataType) {
      case 1:
      case 2:
      case 4:
      case 3:

    }
  }

  useEffect(() => {
    if (id) {
      dispatch(getSearch(id));
    }
  }, [])

  return (
    <Box>
      <h1>{search.name}</h1>
      {search.sections.map((section) => (
        <Box component="div" key={section.id}
             sx={{ borderRadius: '15px', margin: '10px 10px'}}>
          <Grid container alignItems="center">
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
                {section.name}
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{padding: '0px 0px'}}>
              {
                section.fields.map((field) => (
                    <Box key={field.id} component="div" sx={{
                      position: 'relative',
                      width: '100%',
                      marginBottom: '20px',
                      borderRadius: '10px',
                      flexDirection: 'column',
                      display: 'flex',
                      justifyContent: 'center',
                      padding: '10px 0px'
                    }}>
                      <Graphic field={field}/>
                    </Box>
                  )
                )
              }
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
};
