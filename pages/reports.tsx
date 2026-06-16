import type {NextPage} from 'next';
import React from 'react';
import {Text, Card} from '@nextui-org/react';
import {Box} from '../components/styles/box';
import {Flex} from '../components/styles/flex';
import {datasetInfo, embeddingModels} from '../lib/nlp-data';

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
                  pemisahan data awal (train-test split), augmentasi data, ekstraksi fitur, word embedding, dan klasifikasi.
               </Text>
               <Flex css={{gap: '$12', flexWrap: 'wrap'}}>
                  {[
                     {label: 'Dataset Awal', value: '159 docs'},
                     {label: 'Training (Augmented)', value: '258 docs'},
                     {label: 'Embedding', value: '4 model + BERT'},
                     {label: 'Akurasi Terbaik', value: '87.50%'},
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
                  content: `${datasetInfo.totalDocs} dokumen dari ${datasetInfo.categories} kategori dataset ICAR Agriculture.`,
                  color: '#6366f1',
               },
               {
                  title: '2. Preprocessing & Split',
                  icon: '02',
                  content: 'Pemisahan data training dan testing (80:20 stratified) sebelum augmentasi untuk mencegah data leakage.',
                  color: '#8b5cf6',
               },
               {
                  title: '3. Augmentasi',
                  icon: '03',
                  content: `Back-translation 4 Rute (EN/JP/CN/RU) pada data training minoritas untuk menyeimbangkan kelas.`,
                  color: '#06b6d4',
               },
               {
                  title: '4. Ekstraksi Fitur',
                  icon: '04',
                  content: 'TF-IDF, BoW (Unigram), dan N-Gram (Unigram+Bigram).',
                  color: '#10b981',
               },
               {
                  title: '5. Word Embedding',
                  icon: '05',
                  content: `Word2Vec (CBOW & SG), GloVe, FastText (100D), serta Contextual Embedding BERT (mBERT).`,
                  color: '#f59e0b',
               },
               {
                  title: '6. Klasifikasi',
                  icon: '06',
                  content: `TF-IDF + SVM mencapai Accuracy 87.50%, F1 92.0%. BERT + SVM mencapai Accuracy 84.38%.`,
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
               <table style={{width: '100%', borderCollapse: 'collapse', fontFamily: 'Montserrat, sans-serif'}}>
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
                        {
                           name: 'mBERT',
                           shortName: 'BERT',
                           algorithm: 'Transformer',
                           dimensions: 768,
                           color: '#ef4444',
                           pros: 'Contextual embedding, pre-trained multi-bahasa',
                           cons: 'Lambat, butuh komputasi tinggi',
                        }
                     ].map((model, i) => (
                        <tr
                           key={model.name}
                           style={{
                              borderBottom: i < 4 ? '1px solid var(--nextui-colors-border)' : 'none',
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
                  Kesimpulan & Temuan Utama
               </Text>
               <Text css={{color: '$accents7', fontSize: '$sm', lineHeight: 1.8, mb: '$4'}}>
                  <strong>1. Pencegahan Data Leakage:</strong> Penerapan pemisahan train-test split sebelum proses augmentasi sangat penting. Eksperimen Skenario S2 (di mana model dilatih dengan data augmentasi) menunjukkan penurunan akurasi pada beberapa model dibandingkan Skenario S1 (data asli). Hal ini mengindikasikan bahwa augmentasi back-translation mungkin memasukkan noise pada dataset kecil ini.
               </Text>
               <Text css={{color: '$accents7', fontSize: '$sm', lineHeight: 1.8, mb: '$4'}}>
                  <strong>2. Performa Model:</strong> Kombinasi klasikal <strong>TF-IDF + SVM</strong> terbukti menjadi yang terbaik dengan akurasi <strong>87.50%</strong>. Hal ini sejalan dengan sifat dataset dokumen pertanian yang memiliki keyword spesifik berulang, di mana TF-IDF sangat efektif dalam menyorot term-term krusial tersebut.
               </Text>
               <Text css={{color: '$accents7', fontSize: '$sm', lineHeight: 1.8}}>
                  <strong>3. Embedding vs Classical:</strong> Contextual embedding <strong>BERT (mBERT) + SVM</strong> memberikan hasil yang sangat kompetitif di angka <strong>84.38%</strong> bahkan secara zero-shot (tanpa fine-tuning). Menariknya, BERT lebih cocok dipasangkan dengan SVM atau GaussianNB (81.25%) dibandingkan Decision Tree (71.88%) karena sifat embedding-nya yang dens dan bisa bernilai negatif.
               </Text>
            </Card.Body>
         </Card>
      </Box>
   );
};

export default ReportsPage;
