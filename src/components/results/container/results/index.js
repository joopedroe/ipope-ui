import {useCallback, useState, useEffect} from 'react';
import {

  Box, Button, IconButton, SvgIcon, Typography, Unstable_Grid2 as Grid,
} from '@mui/material';
import {getSearch, getSectors, getResults} from "../../config/actions";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faTrashAlt} from "@fortawesome/free-regular-svg-icons";
import {InputActions} from "../../../formSearch/container/style";
import {Select} from "antd";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import Icon from "../../../iconify/Iconify";
import { Graphic } from "../graphic";


const { Options } = Select;


export const Results = (props) => {
  const dispatch = useDispatch();
  const {id} = useParams();

  const search = useSelector(state => state.results.searchResult);
  const sectors = useSelector(state => state.results.sectors);

  const sectorsList = sectors || [];
  const sectorsOptions =[ { label: 'TODOS', value: 0 },  ...sectorsList.map((sector) => ({ label: sector, value: sector }))]

  const onChangeSelectSecto = (value) => {
    dispatch(getResults(search, value))
  }



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
      dispatch(getSectors(id));
    }
  }, [])

  return (
    <Box>
      <h1>{search.name}</h1>
      <Grid item xs={12}>
              <Select
                showSearch
                style={{width: 200}}
                placeholder="Selecione o setor"
                onChange={onChangeSelectSecto}
                options={sectorsOptions}
                >
                </Select>
            </Grid>
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
