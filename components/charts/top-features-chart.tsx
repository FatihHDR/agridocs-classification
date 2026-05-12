import React from 'react';
import {Box} from '../styles/box';
import Chart, {Props} from 'react-apexcharts';
import {topFeaturesTFIDF} from '../../lib/nlp-data';

const features = topFeaturesTFIDF.map((f) => f.feature);
const scores = topFeaturesTFIDF.map((f) => parseFloat(f.score.toFixed(5)));

const state: Props['series'] = [
   {
      name: 'TF-IDF Score',
      data: scores,
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
   plotOptions: {
      bar: {
         horizontal: true,
         borderRadius: 4,
         distributed: false,
      },
   },
   colors: ['#3b82f6'],
   xaxis: {
      categories: features,
      labels: {
         style: {
            colors: 'var(--nextui-colors-accents8)',
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '12px',
         },
      },
      axisBorder: {
         color: 'var(--nextui-colors-border)',
      },
   },
   yaxis: {
      labels: {
         style: {
            colors: 'var(--nextui-colors-accents8)',
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '12px',
         },
      },
   },
   legend: {
      show: false,
   },
   tooltip: {
      enabled: true,
      theme: 'dark',
      y: {
         formatter: (val: number) => val.toFixed(5),
      },
   },
   grid: {
      show: true,
      borderColor: 'var(--nextui-colors-border)',
      strokeDashArray: 3,
   },
   dataLabels: {
      enabled: true,
      formatter: (val: number) => val.toFixed(4),
      style: {
         fontSize: '10px',
         fontFamily: 'Montserrat, sans-serif',
      },
   },
};

export const TopFeaturesChart = () => {
   return (
      <>
         <Box css={{width: '100%', zIndex: 5}}>
            <div id="features-chart">
               <Chart
                  options={options}
                  series={state}
                  type="bar"
                  height={450}
               />
            </div>
         </Box>
      </>
   );
};
