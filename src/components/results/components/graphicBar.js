import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Card, CardHeader, Box } from '@mui/material';
// components
import { useChart } from '../../../components/chart';
import {fNumber} from "../../../utils/formatNumber";
import {useTheme} from "@mui/material/styles";

// ----------------------------------------------------------------------

GraphicBar.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
  chartColors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default function GraphicBar({ title, subheader, chartData, chartColors, ...other }) {

  const theme = useTheme();

  const chartLabels = chartData.map((i) => i.label);

  const chartSeries = chartData.map((i) => i.value);

  const chartOptions = useChart({
    labels: chartLabels,
    colors:chartColors,
    legend: { floating: true, horizontalAlign: 'center' },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `${seriesName}`,
        },
      },
    },
    xaxis: {
      categories: chartLabels,
      labels: {
        style: {
          colors: chartColors,
          fontSize: '12px'
        }
      }
    },
    plotOptions: {
      bar: {
        columnWidth: '45%',
        distributed: true
      },
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="bar" series={[{data:chartSeries}]} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
