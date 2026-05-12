/* eslint-disable @next/next/no-img-element */
import type {NextPage} from 'next';
import React from 'react';
import {Text, Card} from '@nextui-org/react';
import {Box} from '../components/styles/box';
import {Flex} from '../components/styles/flex';
import {categoryDistribution, datasetInfo, pipelineSteps} from '../lib/nlp-data';
import dynamic from 'next/dynamic';

const CategoryDistributionChart = dynamic(
   () => import('../components/charts/steam').then((mod) => mod.CategoryDistributionChart),
   {ssr: false}
);

const DatasetPage: NextPage = () => {
   const total = categoryDistribution.reduce((a, c) => a + c.original, 0);

   return (
      <Box css={{overflow: 'hidden', height: '100%', py: '$10', px: '$12'}}>
         <Text h2 css={{mb: '$2'}}>Dataset & Preprocessing</Text>
         <Text css={{color: '$accents7', mb: '$10'}}>
            Informasi lengkap dataset ICAR Agriculture dan proses preprocessing teks
         </Text>

         {/* Dataset stats */}
         <Flex css={{gap: '$8', flexWrap: 'wrap', mb: '$12'}} direction={'row'}>
            {[
               {label: 'Total Dokumen Asli', value: datasetInfo.totalDocs, color: '#6366f1', icon: '📄'},
               {label: 'Setelah Augmentasi', value: datasetInfo.totalDocsAugmented, color: '#10b981', icon: '🔄'},
               {label: 'Jumlah Kategori', value: datasetInfo.categories, color: '#f59e0b', icon: '🏷️'},
               {label: 'Docs per Kelas (setelah aug)', value: 54, color: '#8b5cf6', icon: '⚖️'},
            ].map((stat) => (
               <Card
                  key={stat.label}
                  css={{
                     flex: '1',
                     minWidth: '180px',
                     borderRadius: '$xl',
                     bg: '$accents0',
                     borderTop: `3px solid ${stat.color}`,
                  }}
               >
                  <Card.Body css={{py: '$8', px: '$8'}}>
                     <Text css={{fontSize: '1.8rem', mb: '$1'}}>{stat.icon}</Text>
                     <Text css={{
                        fontSize: '2rem',
                        fontWeight: 700,
                        color: stat.color,
                        lineHeight: 1,
                        mb: '$2',
                     }}>
                        {stat.value}
                     </Text>
                     <Text css={{color: '$accents6', fontSize: '$sm'}}>
                        {stat.label}
                     </Text>
                  </Card.Body>
               </Card>
            ))}
         </Flex>

         {/* Distribution chart */}
         <Text h3 css={{mb: '$6'}}>Distribusi Kategori (Asli vs Augmented)</Text>
         <Card css={{borderRadius: '$xl', bg: '$accents0', mb: '$12'}}>
            <Card.Body css={{py: '$6', px: '$6'}}>
               <CategoryDistributionChart />
            </Card.Body>
         </Card>

         {/* Category breakdown */}
         <Text h3 css={{mb: '$6'}}>Detail Kategori Dataset</Text>
         <Flex css={{gap: '$6', flexWrap: 'wrap', mb: '$12'}}>
            {categoryDistribution.map((cat) => (
               <Card
                  key={cat.name}
                  css={{
                     flex: '1',
                     minWidth: '240px',
                     borderRadius: '$xl',
                     bg: '$accents0',
                  }}
               >
                  <Card.Body css={{py: '$6', px: '$6'}}>
                     <Flex align={'center'} css={{gap: '$3', mb: '$4'}}>
                        <Box css={{
                           width: '12px',
                           height: '12px',
                           borderRadius: '50%',
                           background: cat.color,
                           flexShrink: 0,
                        }} />
                        <Text b size={'$sm'} css={{color: '$accents9'}}>
                           {cat.name}
                        </Text>
                     </Flex>
                     <Flex css={{gap: '$6'}} justify={'between'}>
                        <Flex direction={'column'} align={'center'}>
                           <Text b css={{fontSize: '1.5rem', color: cat.color}}>{cat.original}</Text>
                           <Text css={{color: '$accents6', fontSize: '$xs'}}>Asli</Text>
                        </Flex>
                        <Flex direction={'column'} align={'center'}>
                           <Text css={{color: '$accents5', fontSize: '$xl'}}>→</Text>
                        </Flex>
                        <Flex direction={'column'} align={'center'}>
                           <Text b css={{fontSize: '1.5rem', color: '#10b981'}}>{cat.augmented}</Text>
                           <Text css={{color: '$accents6', fontSize: '$xs'}}>Augmented</Text>
                        </Flex>
                     </Flex>
                     <Box css={{mt: '$4', bg: '$accents2', borderRadius: '$full', height: '4px', overflow: 'hidden'}}>
                        <Box css={{
                           width: `${(cat.original / 54) * 100}%`,
                           height: '100%',
                           background: cat.color,
                           borderRadius: '$full',
                        }} />
                     </Box>
                     <Text css={{color: '$accents6', fontSize: '$xs', mt: '$2', textAlign: 'right'}}>
                        {cat.original} dari 54 dokumen target
                     </Text>
                  </Card.Body>
               </Card>
            ))}
         </Flex>

         {/* Preprocessing steps */}
         <Text h3 css={{mb: '$6'}}>Tahapan Preprocessing</Text>
         <Card css={{borderRadius: '$xl', bg: '$accents0', mb: '$8'}}>
            <Card.Body css={{py: '$8', px: '$8'}}>
               <Flex css={{gap: '$6', flexWrap: 'wrap'}}>
                  {[
                     {step: '1', name: 'Lowercasing', desc: 'Mengubah semua teks ke huruf kecil'},
                     {step: '2', name: 'Tokenisasi', desc: 'Memisahkan teks menjadi token kata'},
                     {step: '3', name: 'Stopword Removal', desc: 'Menghapus kata-kata tidak bermakna'},
                     {step: '4', name: 'Stemming/Lemmatization', desc: 'Normalisasi bentuk kata dasar'},
                     {step: '5', name: 'Augmentation', desc: 'Back-translation ID→EN→ID'},
                     {step: '6', name: 'Vectorization', desc: 'TF-IDF & BoW representation'},
                  ].map((s) => (
                     <Flex key={s.step} css={{flex: 1, minWidth: '250px', gap: '$4'}} align={'start'}>
                        <Flex align={'center'} justify={'center'} css={{
                           width: '32px',
                           height: '32px',
                           borderRadius: '50%',
                           background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                           flexShrink: 0,
                        }}>
                           <Text span css={{color: 'white', fontSize: '$xs'}} weight="semibold">{s.step}</Text>
                        </Flex>
                        <Flex direction={'column'}>
                           <Text b css={{fontSize: '$sm', color: '$accents9'}}>{s.name}</Text>
                           <Text css={{fontSize: '$xs', color: '$accents6'}}>{s.desc}</Text>
                        </Flex>
                     </Flex>
                  ))}
               </Flex>
            </Card.Body>
         </Card>

         {/* Augmentation image */}
         <Text h3 css={{mb: '$6'}}>Visualisasi Augmentasi</Text>
         <Card css={{borderRadius: '$xl', bg: '$accents0', overflow: 'hidden'}}>
            <Card.Header css={{py: '$4', px: '$6'}}>
               <Text b size={'$sm'}>Back Translation Augmentation Result</Text>
            </Card.Header>
            <Card.Body css={{p: 0}}>
               <img
                  src="/output/back_translation_augmentation.png"
                  alt="Back Translation Augmentation"
                  style={{width: '100%', maxHeight: '400px', objectFit: 'contain', padding: '20px'}}
               />
            </Card.Body>
         </Card>
      </Box>
   );
};

export default DatasetPage;
