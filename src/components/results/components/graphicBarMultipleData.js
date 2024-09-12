import PropTypes from 'prop-types';
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import exporting from 'highcharts/modules/exporting';
import { getColorByName } from '../../../utils'
// @mui
import { Card } from '@mui/material';


function splitList(list) {
  const maxItems = 20;

  if (list.length <= 22) {
    return [list];
  }

  const parts = Math.ceil(list.length / maxItems);
  const result = [];

  for (let i = 0; i < parts; i++) {
    const start = i * Math.ceil(list.length / parts);
    const end = (i + 1) * Math.ceil(list.length / parts);
    result.push(list.slice(start, end));
  }

  return result;
}



exporting(Highcharts);

const ColumnChart = ({ title, subheader, chartColors, chartData, totalValue, max, ...other }) => {

  // Calcula o total de valores


  // Mapeia os dados para o formato do gráfico
  const chartLabels = chartData.map((i, index) => (
    { y: Number(((i.value * 100) / totalValue).toFixed(1)), color: getColorByName(i.label) || chartColors[index] }
  ));

  const chartCategories = chartData.map((item) => item.label);

  // Configuração do gráfico de colunas
  const options = {
    chart: {
      type: 'column' // Define como gráfico de colunas
    },
    title: {
      text: title
    },
    xAxis: {
      categories: chartCategories, // Define as categorias no eixo X
      title: {
        text: null
      },
      labels: {
        //rotation: -45, // Gira os rótulos para evitar sobreposição
        step: 1, // Garante que todos os rótulos serão mostrados
      },
    },
    yAxis: {
      min: 0,
      max: max + 5,
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
          formatter: function () {
            // Formata para exibir o valor e a porcentagem
            return `${this.y} %`;
          }
        }
      }
    },
    series: [
      {
        name: '',
        data: chartLabels
      },
    ],
    legend: {
      enabled: false // Oculta a legenda
    },
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

const renderGraphic = ({ title, subheader, chartColors, chartData, ...other }) => {

  let max = 0;

  const totalValue = chartData.reduce((total, item) => total + item.value, 0);
  chartData.map((item, index) => {
    const valueItem = Number(((item.value * 100) / totalValue).toFixed(0))
    if (valueItem > max) {
      console.log(valueItem)
      max = valueItem
    }
  });

  const dividedList = splitList(chartData);

  return (
    <>
      {
        dividedList.map((item, index) => (
          <ColumnChart key={index} title={title} chartColors={chartColors} chartData={item} totalValue={totalValue} max={max} />
        ))
      }
    </>
  )
}

ColumnChart.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartColors: PropTypes.array,
  chartData: PropTypes.array.isRequired,
};

export default renderGraphic;
