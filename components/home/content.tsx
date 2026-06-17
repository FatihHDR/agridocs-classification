import React from 'react';
import {Text} from '@nextui-org/react';
import {Box} from '../styles/box';
import dynamic from 'next/dynamic';
import {Flex} from '../styles/flex';
import {TableWrapper} from '../table/table';
import {CardDatasetInfo} from './card-balance1';
import {CardEmbeddingModels} from './card-balance2';
import {CardClassificationScore} from './card-balance3';
import {CardPipelineStatus} from './card-agents';
import {CardEmbeddingStats} from './card-transactions';

const Chart = dynamic(
   () => import('../charts/steam').then((mod) => mod.CategoryDistributionChart),
   {
      ssr: false,
   }
);

const LineChart = dynamic(
   () => import('../charts/model-accuracy-chart').then((mod) => mod.ModelAccuracyChart),
   {
      ssr: false,
   }
);

export const Content = () => (
   <Box css={{overflow: 'hidden', height: '100%'}}>
      <Flex
         css={{
            'gap': '$8',
            'pt': '$5',
            'height': 'fit-content',
            'flexWrap': 'wrap',
            '@lg': {
               flexWrap: 'nowrap',
            },
            '@sm': {
               pt: '$10',
            },
         }}
         justify={'center'}
      >
         <Flex
            css={{
               'px': '$12',
               'mt': '$8',
               '@xsMax': {px: '$10'},
               'gap': '$12',
               'width': '100%',
               'maxWidth': '1400px',
               'margin': '0 auto',
            }}
            direction={'column'}
         >
            {/* Card Section Top */}
            <Box>
               <Text
                  h3
                  css={{
                     'textAlign': 'center',
                     '@sm': {
                        textAlign: 'inherit',
                     },
                  }}
               >
                  Ringkasan Pipeline NLP
               </Text>
               <Flex
                  css={{
                     'gap': '$10',
                     'flexWrap': 'wrap',
                     'justifyContent': 'center',
                     '@sm': {
                        justifyContent: 'flex-start',
                     },
                  }}
                  direction={'row'}
               >
                  <CardDatasetInfo />
                  <CardEmbeddingModels />
                  <CardClassificationScore />
               </Flex>
            </Box>

            {/* Model Detail Cards - Moved from sidebar */}
            <Box>
               <Text
                  h3
                  css={{
                     'textAlign': 'center',
                     '@sm': {
                        textAlign: 'inherit',
                     },
                  }}
               >
                  Detail Model & Pipeline
               </Text>
               <Flex
                  css={{
                     'gap': '$10',
                     'flexWrap': 'wrap',
                     'justifyContent': 'center',
                     '@sm': {
                        justifyContent: 'flex-start',
                     },
                  }}
                  direction={'row'}
               >
                  <CardPipelineStatus />
                  <CardEmbeddingStats />
               </Flex>
            </Box>

            {/* Chart */}
            <Box>
               <Text
                  h3
                  css={{
                     'textAlign': 'center',
                     '@lg': {
                        textAlign: 'inherit',
                     },
                  }}
               >
                  Distribusi Kategori Dataset
               </Text>
               <Box
                  css={{
                     width: '100%',
                     backgroundColor: '$accents0',
                     boxShadow: '$lg',
                     borderRadius: '$2xl',
                     px: '$10',
                     py: '$10',
                  }}
               >
                  <Chart />
               </Box>
            </Box>

            {/* Line Chart */}
            <Box>
               <Text
                  h3
                  css={{
                     'textAlign': 'center',
                     '@lg': {
                        textAlign: 'inherit',
                     },
                  }}
               >
                  Akurasi Model Berdasarkan Split Ratio
               </Text>
               <Box
                  css={{
                     width: '100%',
                     backgroundColor: '$accents0',
                     boxShadow: '$lg',
                     borderRadius: '$2xl',
                     px: '$10',
                     py: '$10',
                     mb: '$10',
                  }}
               >
                  <LineChart />
               </Box>
            </Box>
         </Flex>
      </Flex>

      {/* Top TF-IDF Features Table */}
      <Flex
         direction={'column'}
         justify={'center'}
         css={{
            'width': '100%',
            'py': '$10',
            'px': '$10',
            'mt': '$8',
            '@sm': {px: '$20'},
         }}
      >
         <Flex justify={'between'} wrap={'wrap'}>
            <Text
               h3
               css={{
                  'textAlign': 'center',
                  '@lg': {
                     textAlign: 'inherit',
                  },
               }}
            >
               Top 15 Fitur TF-IDF
            </Text>
         </Flex>
         <TableWrapper />
      </Flex>

      {/* Confusion Matrix Section */}
      <Flex
         direction={'column'}
         justify={'center'}
         css={{
            'width': '100%',
            'py': '$10',
            'px': '$10',
            'mt': '$4',
            'mb': '$10',
            '@sm': {px: '$20'},
            'alignItems': 'center',
         }}
      >
         <Text
            h3
            css={{
               'textAlign': 'center',
               'mb': '$6'
            }}
         >
            Confusion Matrix: SVM + TF-IDF (97%)
         </Text>
         <Box css={{ 
            width: '100%', 
            maxWidth: '800px', 
            bg: '$accents0', 
            borderRadius: '$2xl', 
            p: '$8', 
            boxShadow: '$lg',
            display: 'flex',
            justifyContent: 'center'
         }}>
            <img 
               src="/cm_mitigated.png" 
               alt="Confusion Matrix" 
               style={{ width: '100%', height: 'auto', borderRadius: '12px' }} 
            />
         </Box>
      </Flex>
   </Box>
);
