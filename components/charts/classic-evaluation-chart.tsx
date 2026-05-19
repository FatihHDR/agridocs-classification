import React from 'react';
import {Box} from '../styles/box';
import Chart, {Props} from 'react-apexcharts';

const evaluationData = [
   { label: 'NB + BoW', acc: 78.46, prec: 81.0, f1: 77.0 },
   { label: 'NB + N-Gram (1,2)', acc: 78.46, prec: 81.0, f1: 77.0 },
   { label: 'NB + TF-IDF', acc: 76.92, prec: 82.0, f1: 77.0 },
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
   colors: ['#17C964', '#F5A524', '#0072F5'],
   plotOptions: {
      bar: {
         horizontal: false,
         borderRadius: 4,
         columnWidth: '50%',
      },
   },
   xaxis: {
      categories: labels,
      labels: {
         style: {
            colors: 'var(--nextui-colors-accents8)',
            fontFamily: 'Montserrat, sans-serif',
         },
      },
      axisBorder: {
         color: 'var(--nextui-colors-border)',
      },
   },
   yaxis: {
      min: 60,
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

export const ClassicEvaluationChart = () => {
   return (
      <Box css={{width: '100%', zIndex: 5}}>
         <div id="classic-eval-chart">
            <Chart
               options={options}
               series={state}
               type="bar"
               height={360}
            />
         </div>
      </Box>
   );
};