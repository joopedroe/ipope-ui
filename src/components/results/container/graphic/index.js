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
import GraphicBar from "../../components/graphicBar";
import GraphicPie from "../../components/graphicPie";
import CircularProgress from '@mui/material/CircularProgress';
import {useTheme} from "@mui/material/styles";


export const Graphic = (props) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const {field} = props;

  const data = useSelector(state => state.results.results[field.id]);
  console.log('data', data)

if(!data) return (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
    <CircularProgress />
  </Box>
)

  return (
    <>
    {
      field['options'].length > 3 ? (
        <GraphicBar
          title={field.question}
          subheader="(+43%) than last year"
          chartData={data}
          chartColors={[
            theme.palette.primary.main,
            theme.palette.warning.main,
            theme.palette.info.main,
            theme.palette.error.main,
          ]}
        />
      ) : (
        <GraphicPie
          title={field.question}
          chartData={data}
          chartColors={[
            theme.palette.primary.main,
            theme.palette.warning.main,
            theme.palette.info.main,
            theme.palette.error.main,
          ]}
        />
      )
    }
    </>
  );
};
