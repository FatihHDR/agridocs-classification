/* eslint-disable @next/next/no-img-element */
import type {NextPage} from 'next';
import React from 'react';
import {Text, Card} from '@nextui-org/react';
import {Box} from '../components/styles/box';
import {Flex} from '../components/styles/flex';
import {categoryDistribution, datasetInfo, backTranslationExamples} from '../lib/nlp-data';
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
               {label: 'Total Dokumen Asli', value: datasetInfo.totalDocs, color: '#6366f1', icon: 'DOC'},
               {label: 'Setelah Augmentasi', value: datasetInfo.totalDocsAugmented, color: '#10b981', icon: 'AUG'},
               {label: 'Jumlah Kategori', value: datasetInfo.categories, color: '#f59e0b', icon: 'CAT'},
               {label: 'Metode Augmentasi', value: '4 Rute Terjemahan', color: '#8b5cf6', icon: 'NLP'},
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
                     <Text css={{fontSize: '1rem', fontWeight: 600, color: '$accents6', mb: '$1'}}>{stat.icon}</Text>
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
                     <Box css={{mt: '$4', bg: '$accents2', borderRadius: '$full', height: '6px', overflow: 'hidden'}}>
                        <Box css={{
                           width: `${Math.min(100, (cat.augmented / 86) * 100)}%`,
                           height: '100%',
                           background: cat.color,
                           borderRadius: '$full',
                        }} />
                     </Box>
                     <Text css={{color: '$accents6', fontSize: '$xs', mt: '$2', textAlign: 'right'}}>
                        Peningkatan {(cat.augmented - cat.original)} dokumen
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
                     {step: '5', name: 'Augmentation', desc: 'Back-translation (EN→FR/DE/RU/ES→EN)'},
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

         {/* Augmentation Table */}
         <Text h3 css={{mb: '$6'}}>Contoh Hasil Augmentasi (Back Translation)</Text>
         <Card css={{borderRadius: '$xl', bg: '$accents0', overflow: 'hidden', mb: '$12'}}>
            <Card.Body css={{p: 0}}>
               <div style={{ overflowX: 'auto' }}>
                  <table style={{width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontFamily: 'Montserrat, sans-serif'}}>
                     <thead>
                        <tr style={{background: 'var(--nextui-colors-accents1)', borderBottom: '1px solid var(--nextui-colors-border)'}}>
                           <th style={{padding: '16px 20px', width: '40%', color: 'var(--nextui-colors-accents8)', fontSize: '13px'}}>Teks Asli (ICAR Dataset)</th>
                           <th style={{padding: '16px 20px', width: '15%', color: 'var(--nextui-colors-accents8)', fontSize: '13px'}}>Metode</th>
                           <th style={{padding: '16px 20px', width: '45%', color: 'var(--nextui-colors-accents8)', fontSize: '13px'}}>Hasil Augmentasi</th>
                        </tr>
                     </thead>
                     <tbody>
                        {backTranslationExamples.map((ex, idx) => (
                           <tr key={idx} style={{borderBottom: '1px solid var(--nextui-colors-border)'}}>
                              <td style={{padding: '16px 20px', fontSize: '13px', color: 'var(--nextui-colors-accents7)', lineHeight: 1.6}}>
                                 {ex.original}
                              </td>
                              <td style={{padding: '16px 20px'}}>
                                 <Box css={{
                                    bg: 'var(--nextui-colors-primaryLight)', 
                                    color: 'var(--nextui-colors-primary)',
                                    px: '$4', py: '$2', borderRadius: '$md', display: 'inline-block',
                                    fontSize: '12px', fontWeight: 600
                                 }}>
                                    {ex.method}
                                 </Box>
                              </td>
                              <td style={{padding: '16px 20px', fontSize: '13px', color: 'var(--nextui-colors-accents9)', lineHeight: 1.6, fontWeight: 500}}>
                                 {ex.augmented}
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </Card.Body>
         </Card>
      </Box>
   );
};

export default DatasetPage;
