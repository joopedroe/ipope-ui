import {useCallback, useState, useEffect} from 'react';
import {

  Box, Button, IconButton, SvgIcon, Typography, Unstable_Grid2 as Grid,
} from '@mui/material';
import {getSearch} from "../../config/actions";
import {useDispatch, useSelector} from "react-redux";
import GraphicBar from "../../components/graphicBar";
import GraphicPie from "../../components/graphicPie";
import GraphicBarMultipleData from "../../components/graphicBarMultipleData";
import CircularProgress from '@mui/material/CircularProgress';
import {useTheme} from "@mui/material/styles";
import { colors } from "../../../../constants/colors"


export const Graphic = (props) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const {field} = props;
  const data = useSelector(state => state.results.results[field.id]);
  const dataList = data || [];

  let typeGraphic = dataList.length > 2 ? 'bar' : 'pie';


if(!data) return (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
    <CircularProgress />
  </Box>
)
  if(data && data.length > 6){
    typeGraphic = 'barMultipleData'
  }

  const renderGraphic = () => {
    switch (typeGraphic){
      case 'bar':
        return (
          <GraphicBar
            title={field.question}
            chartData={data}
            chartColors={[
              theme.palette.primary.main,
              theme.palette.warning.main,
              theme.palette.info.main,
              theme.palette.error.main,
              ...colors
            ]}
          />
        )
      case 'pie':
        return (
          <GraphicPie
            title={field.question}
            chartData={data}
            chartColors={[
              theme.palette.primary.main,
              theme.palette.warning.main,
              theme.palette.info.main,
              theme.palette.error.main,
              ...colors
            ]}
          />
        )
      case 'barMultipleData':
        return (
          <GraphicBarMultipleData
            title={field.question}
            chartData={data}
            chartColors={[
              theme.palette.primary.main,
              theme.palette.warning.main,
              theme.palette.info.main,
              theme.palette.error.main,
              ...colors
            ]}
          />
        )
    }
  }

  return (
    <>
    {
      renderGraphic()
    }
    </>
  );
};
