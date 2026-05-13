import React from 'react';
import {Box} from '../styles/box';
import Chart, {Props} from 'react-apexcharts';

const evaluationData = [
   { label: 'DT + W2V Skip-Gram', acc: 75.38, prec: 78.98, f1: 75.99 },
   { label: 'DT + FastText', acc: 73.85, prec: 75.40, f1: 71.92 },
   { label: 'DT + W2V CBOW', acc: 72.31, prec: 72.29, f1: 70.11 },
   { label: 'DT + GloVe', acc: 70.77, prec: 69.88, f1: 69.56 },
   { label: 'NB + GloVe', acc: 67.69, prec: 75.90, f1: 68.55 },
   { label: 'NB + W2V Skip-Gram', acc: 66.15, prec: 73.52, f1: 67.09 },
   { label: 'NB + W2V CBOW', acc: 58.46, prec: 54.91, f1: 54.81 },
   { label: 'NB + FastText', acc: 52.31, prec: 50.07, f1: 47.52 },
];

const labels = evaluationData.map((d) => d.label);

const state: Props['series'] = [
   {
      name: 'Accuracy',
      data: evaluationData.map((d) => d.acc),
   },
   {
      name: 'Precision',
      data: evaluationData.map((d) => d.prec),
   },
   {
      name: 'F1-Score',
      data: evaluationData.map((d) => d.f1),
   },
];

const options: Props['options'] = {
   chart: {
      type: 'bar',
      fontFamily: 'Montserrat, sans-serif',
      foreColor: 'var(--nextui-colors-accents9)',
      toolbar: {
         show: false,
      },
   },
   colors: ['#0072F5', '#17C964', '#F5A524'],
   plotOptions: {
      bar: {
         horizontal: false,
         borderRadius: 4,
         columnWidth: '60%',
      },
   },
   xaxis: {
      categories: labels,
      labels: {
         style: {
            colors: 'var(--nextui-colors-accents8)',
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '11px',
         },
         rotate: -45,
      },
      axisBorder: {
         color: 'var(--nextui-colors-border)',
      },
   },
   yaxis: {
      min: 40,
      max: 100,
      labels: {
         style: {
            colors: 'var(--nextui-colors-accents8)',
            fontFamily: 'Montserrat, sans-serif',
         },
         formatter: (val: number) => `${val}%`,
      },
   },
   legend: {
      position: 'top',
      labels: {
         colors: 'var(--nextui-colors-accents8)',
      },
   },
   tooltip: {
      enabled: true,
      theme: 'dark',
      y: {
         formatter: (val: number) => `${val}%`,
      },
   },
   grid: {
      show: true,
      borderColor: 'var(--nextui-colors-border)',
      strokeDashArray: 3,
   },
   dataLabels: {
      enabled: false,
   },
};

export const EmbeddingEvaluationChart = () => {
   return (
      <Box css={{width: '100%', zIndex: 5}}>
         <div id="embedding-eval-chart">
            <Chart
               options={options}
               series={state}
               type="bar"
               height={400}
            />
         </div>
      </Box>
   );
};
