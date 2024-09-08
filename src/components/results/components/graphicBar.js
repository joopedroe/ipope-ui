import PropTypes from 'prop-types';
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import exporting from 'highcharts/modules/exporting';
import { getColorByName } from '../../../utils'
// @mui
import { Card } from '@mui/material';

exporting(Highcharts);

const ColumnChart = ({ title, subheader, chartColors, chartData, ...other }) => {

  // Calcula o total de valores
  const totalValue = chartData.reduce((total, item) => total + item.value, 0);

  // Mapeia os dados para o formato do gráfico
  const chartLabels = chartData.map((i, index) => ({
    name: i.label,
    data: [Number(((i.value *100)/ totalValue).toFixed(1))],
    color: getColorByName(i.label) || chartColors[index]
  }));

  // Configuração do gráfico de colunas
  const options = {
    chart: {
      type: 'column' // Define como gráfico de colunas
    },
    title: {
      text: title
    },
    xAxis: {
      categories: [''], // Define as categorias no eixo X
      title: {
        text: null
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Valor'
      },
      labels: {
        overflow: 'justify'
      }
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          formatter: function() {
            // Formata para exibir o valor e a porcentagem
            return `${this.y} %`;
          }
        }
      }
    },
    series: chartLabels,
    credits: {
      enabled: false // Desativa os créditos
    },
    exporting: {
      enabled: true // Habilita a exportação do gráfico
    }
  };

  return (
    <Card {...other}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Card>
  );
};

ColumnChart.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartColors: PropTypes.array,
  chartData: PropTypes.array.isRequired,
};

export default ColumnChart;
