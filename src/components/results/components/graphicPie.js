import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
// components
import { useChart } from '../../../components/chart';

import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import exporting from 'highcharts/modules/exporting';

exporting(Highcharts);

const PieChart = ({ title, subheader, chartColors, chartData, ...other }) => {

  const totalValue = chartData.reduce((total, item) => total + item.value, 0);

  const chartLabels = chartData.map((i) => ({
    name: i.label,
    y: Number(((i.value *100)/ totalValue).toFixed(1))
  }));


  const options = {
    chart: {
      type: 'pie'
    },
    title: {
      text: title
    },
    plotOptions: {
      series: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: [{
          enabled: true,
          distance: 20
        }, {
          enabled: true,
          distance: -40,
          format: '{point.percentage:.1f}%',
          style: {
            fontSize: '1.2em',
            textOutline: 'none',
            opacity: 0.7
          },
          filter: {
            operator: '>',
            property: 'percentage',
            value: 10
          }
        }]
      }
    },
    series: [
      {
        name: 'Porcentagem',
        data: chartLabels
      }
    ],
    credits: {
      enabled: false
    }
  };

  return (
    <Card {...other}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Card>
  );
};

export default PieChart;

