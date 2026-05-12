import type {NextPage} from 'next';
import React from 'react';
import {Text, Card} from '@nextui-org/react';
import {Box} from '../components/styles/box';
import {Flex} from '../components/styles/flex';
import {datasetInfo, embeddingModels, classificationResults, categoryDistribution} from '../lib/nlp-data';

const ReportsPage: NextPage = () => {
   return (
      <Box css={{overflow: 'hidden', height: '100%', py: '$10', px: '$12'}}>
         <Text h2 css={{mb: '$2'}}>Laporan Hasil</Text>
         <Text css={{color: '$accents7', mb: '$10'}}>
            Ringkasan lengkap hasil penelitian NLP pada dataset ICAR Agriculture
         </Text>

         {/* Summary Card */}
         <Card css={{
            borderRadius: '$xl',
            mb: '$10',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            overflow: 'hidden',
         }}>
            <Card.Body css={{py: '$10', px: '$10'}}>
               <Text h2 css={{color: 'white', mb: '$2'}}>
                  Ringkasan Eksperimen NLP
               </Text>
               <Text css={{color: 'rgba(255,255,255,0.8)', mb: '$8', fontSize: '$sm', lineHeight: 1.7}}>
                  Penelitian ini mengimplementasikan pipeline NLP lengkap pada dataset ICAR Agriculture untuk 
                  klasifikasi dokumen pertanian India ke dalam 6 kategori. Pipeline mencakup preprocessing, 
                  augmentasi data, ekstraksi fitur, word embedding, dan klasifikasi.
               </Text>
               <Flex css={{gap: '$12', flexWrap: 'wrap'}}>
                  {[
                     {label: 'Dataset', value: '159 → 324 docs'},
                     {label: 'Kategori', value: '6 kelas'},
                     {label: 'Embedding', value: '4 model'},
                     {label: 'Akurasi Terbaik', value: '84.7%'},
                  ].map((s) => (
                     <Flex key={s.label} direction={'column'}>
                        <Text css={{color: 'rgba(255,255,255,0.7)', fontSize: '$xs', mb: '$1'}}>
                           {s.label}
                        </Text>
                        <Text b css={{color: 'white', fontSize: '$xl'}}>
                           {s.value}
                        </Text>
                     </Flex>
                  ))}
               </Flex>
            </Card.Body>
         </Card>

         {/* Pipeline Summary */}
         <Text h3 css={{mb: '$6'}}>Ringkasan Pipeline</Text>
         <Flex css={{gap: '$6', flexWrap: 'wrap', mb: '$12'}}>
            {[
               {
                  title: '1. Data Collection',
                  icon: '01',
                  content: `${datasetInfo.totalDocs} dokumen dari ${datasetInfo.categories} kategori dataset ICAR Agriculture`,
                  color: '#6366f1',
               },
               {
                  title: '2. Preprocessing',
                  icon: '02',
                  content: 'Lowercasing, tokenisasi, stopword removal, stemming/lemmatization',
                  color: '#8b5cf6',
               },
               {
                  title: '3. Augmentasi',
                  icon: '03',
                  content: `Back-translation (ID→EN→ID) menghasilkan ${datasetInfo.totalDocsAugmented} dokumen (54 per kelas)`,
                  color: '#06b6d4',
               },
               {
                  title: '4. Ekstraksi Fitur',
                  icon: '04',
                  content: 'TF-IDF dengan 1000 fitur, BoW + n-gram (1,2). Fitur utama: "yield", "farming", "pradesh"',
                  color: '#10b981',
               },
               {
                  title: '5. Word Embedding',
                  icon: '05',
                  content: `4 model: Word2Vec CBOW, Word2Vec Skip-gram, GloVe, FastText. Dimensi: 100D`,
                  color: '#f59e0b',
               },
               {
                  title: '6. Klasifikasi',
                  icon: '06',
                  content: `TF-IDF + SVM: Accuracy 84.7%, F1 84.3%. Kelas terbaik: "Annual Reports" (F1: 87%)`,
                  color: '#ef4444',
               },
            ].map((item) => (
               <Card
                  key={item.title}
                  css={{
                     flex: '1',
                     minWidth: '280px',
                     borderRadius: '$xl',
                     bg: '$accents0',
                     borderLeft: `4px solid ${item.color}`,
                  }}
               >
                  <Card.Body css={{py: '$6', px: '$6'}}>
                     <Flex css={{gap: '$3', mb: '$3'}} align={'center'}>
                        <Text b css={{fontSize: '1rem', color: item.color}}>{item.icon}</Text>
                        <Text b css={{color: '$accents9', fontSize: '$sm'}}>{item.title}</Text>
                     </Flex>
                     <Text css={{color: '$accents6', fontSize: '$xs', lineHeight: 1.6}}>
                        {item.content}
                     </Text>
                  </Card.Body>
               </Card>
            ))}
         </Flex>

         {/* Embedding comparison */}
         <Text h3 css={{mb: '$6'}}>Perbandingan Model Embedding</Text>
         <Card css={{borderRadius: '$xl', bg: '$accents0', mb: '$12'}}>
            <Card.Body css={{p: 0}}>
               <table style={{width: '100%', borderCollapse: 'collapse', fontFamily: 'Inter, sans-serif'}}>
                  <thead>
                     <tr style={{borderBottom: '1px solid var(--nextui-colors-border)'}}>
                        {['Model', 'Algoritma', 'Dimensi', 'Kelebihan', 'Kekurangan'].map((h) => (
                           <th key={h} style={{
                              padding: '14px 20px',
                              textAlign: 'left',
                              fontSize: '12px',
                              fontWeight: 600,
                              color: 'var(--nextui-colors-accents7)',
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em',
                           }}>
                              {h}
                           </th>
                        ))}
                     </tr>
                  </thead>
                  <tbody>
                     {[
                        {
                           ...embeddingModels[0],
                           pros: 'Cepat dilatih, baik untuk corpus besar',
                           cons: 'Kurang sensitif terhadap urutan kata',
                        },
                        {
                           ...embeddingModels[1],
                           pros: 'Representasi konteks lebih baik',
                           cons: 'Lebih lambat dari CBOW',
                        },
                        {
                           ...embeddingModels[2],
                           pros: 'Memanfaatkan statistik global, efisien',
                           cons: 'Butuh banyak memori untuk co-occurrence matrix',
                        },
                        {
                           ...embeddingModels[3],
                           pros: 'Menangani OOV dengan subword, robust',
                           cons: 'Ukuran model lebih besar',
                        },
                     ].map((model, i) => (
                        <tr
                           key={model.name}
                           style={{
                              borderBottom: i < 3 ? '1px solid var(--nextui-colors-border)' : 'none',
                           }}
                        >
                           <td style={{padding: '14px 20px'}}>
                              <Flex align={'center'} css={{gap: '$3'}}>
                                 <Box css={{
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    background: model.color,
                                    flexShrink: 0,
                                 }} />
                                 <span style={{fontWeight: 700, color: 'var(--nextui-colors-accents9)'}}>
                                    {model.shortName}
                                 </span>
                              </Flex>
                           </td>
                           <td style={{padding: '14px 20px', color: 'var(--nextui-colors-accents7)', fontSize: '13px'}}>
                              {model.algorithm}
                           </td>
                           <td style={{padding: '14px 20px', fontWeight: 600, color: model.color}}>
                              {model.dimensions}D
                           </td>
                           <td style={{padding: '14px 20px', color: 'var(--nextui-colors-accents7)', fontSize: '13px'}}>
                              + {model.pros}
                           </td>
                           <td style={{padding: '14px 20px', color: 'var(--nextui-colors-accents7)', fontSize: '13px'}}>
                              - {model.cons}
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </Card.Body>
         </Card>

         {/* Conclusion */}
         <Card css={{
            borderRadius: '$xl',
            bg: 'linear-gradient(135deg, #10b98110, #06b6d410)',
            border: '1px solid #10b98130',
         }}>
            <Card.Body css={{py: '$8', px: '$8'}}>
               <Text b css={{mb: '$4', color: '$accents9', fontSize: '$lg'}}>
                  Kesimpulan
               </Text>
               <Text css={{color: '$accents7', fontSize: '$sm', lineHeight: 1.8}}>
                  Pipeline NLP yang diimplementasikan berhasil mengklasifikasikan dokumen pertanian ICAR ke dalam 
                  6 kategori dengan akurasi <strong>84.7%</strong> menggunakan TF-IDF + SVM. Augmentasi data 
                  back-translation berhasil menyeimbangkan distribusi kelas dari kondisi imbalanced (7–54 dokumen) 
                  menjadi balanced (54 dokumen per kelas). Keempat model word embedding (W2Vec CBOW, W2Vec Skip-gram, 
                  GloVe, FastText) berhasil diimplementasikan dengan dimensi 100D dan menghasilkan representasi 
                  vektor yang dapat divisualisasikan melalui PCA.
               </Text>
            </Card.Body>
         </Card>
      </Box>
   );
};

export default ReportsPage;
