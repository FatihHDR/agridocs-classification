/* eslint-disable @next/next/no-img-element */
import type {NextPage} from 'next';
import React from 'react';
import {Text, Card, Badge, Modal, Grid} from '@nextui-org/react';
import {Box} from '../components/styles/box';
import {Flex} from '../components/styles/flex';
import {embeddingModels} from '../lib/nlp-data';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// Dynamically import chart to avoid SSR issues
const TopFeaturesChart = dynamic(
   () => import('../components/charts/top-features-chart').then((mod) => mod.TopFeaturesChart),
   {ssr: false}
);

         {/* Dynamically import chart to avoid SSR issues */}
const EmbeddingEvaluationChart = dynamic(
   () => import('../components/charts/embedding-evaluation-chart').then((mod) => mod.EmbeddingEvaluationChart),
   {ssr: false}
);

const EmbeddingPage: NextPage = () => {
   const [previewImage, setPreviewImage] = React.useState<string | null>(null);

   return (
      <Box css={{overflow: 'hidden', height: '100%', py: '$10', px: '$12'}}>
         <Text h2 css={{mb: '$2'}}>Word Embedding</Text>
         <Text css={{color: '$accents7', mb: '$10'}}>
            Representasi vektor kata dari dataset ICAR Agriculture menggunakan 4 metode embedding
         </Text>

         {/* Model Cards */}
         <Flex css={{gap: '$8', flexWrap: 'wrap', mb: '$12'}} direction={'row'}>
            {embeddingModels.map((model) => (
               <Card
                  key={model.name}
                  css={{
                     minWidth: '200px',
                     flex: '1',
                     borderRadius: '$xl',
                     bg: '$accents0',
                     borderTop: `3px solid ${model.color}`,
                  }}
               >
                  <Card.Body css={{py: '$8', px: '$8'}}>
                     <Flex css={{gap: '$3', mb: '$3'}} align={'center'}>
                        <Box
                           css={{
                              width: '12px',
                              height: '12px',
                              borderRadius: '50%',
                              background: model.color,
                              flexShrink: 0,
                           }}
                        />
                        <Text b size={'$lg'} css={{color: '$accents9'}}>
                           {model.shortName}
                        </Text>
                     </Flex>
                     <Text css={{color: '$accents6', fontSize: '$sm', mb: '$4'}}>
                        {model.description}
                     </Text>
                     <Flex css={{gap: '$4', flexWrap: 'wrap'}}>
                        <Badge variant="flat" color="primary" size="sm">
                           {model.dimensions}D
                        </Badge>
                        <Badge variant="flat" color="secondary" size="sm">
                           {model.docs} docs
                        </Badge>
                        <Badge variant="flat" color="default" size="sm">
                           window={model.windowSize}
                        </Badge>
                     </Flex>
                  </Card.Body>
               </Card>
            ))}
         </Flex>

         {/* PCA Visualizations */}
         <Text h3 css={{mb: '$6'}}>Visualisasi PCA (2D)</Text>
         <Text css={{color: '$accents7', mb: '$8', fontSize: '$sm'}}>
            Proyeksi 100 dimensi embedding ke 2 dimensi menggunakan Principal Component Analysis
         </Text>
         <Flex css={{gap: '$8', flexWrap: 'wrap', mb: '$12'}}>
            {[
               {label: 'Word2Vec CBOW', file: 'pca_word_word2vec_cbow.png', color: '#6366f1'},
               {label: 'Word2Vec Skip-gram', file: 'pca_word_word2vec_skip-gram.png', color: '#8b5cf6'},
               {label: 'GloVe', file: 'pca_word_glove.png', color: '#06b6d4'},
               {label: 'FastText', file: 'pca_word_fasttext.png', color: '#10b981'},
            ].map((img) => (
               <Card
                  key={img.label}
                  css={{
                     flex: '1',
                     minWidth: '280px',
                     borderRadius: '$xl',
                     bg: '$accents0',
                     overflow: 'hidden',
                     borderTop: `3px solid ${img.color}`,
                  }}
               >
                  <Card.Header css={{py: '$4', px: '$6'}}>
                     <Text b size={'$sm'}>{img.label}</Text>
                  </Card.Header>
                  <Card.Body css={{p: 0}}>
                     <img
                        src={`/output/${img.file}`}
                        alt={`PCA ${img.label}`}
                        onClick={() => setPreviewImage(`/output/${img.file}`)}
                        style={{
                           width: '100%',
                           height: '220px',
                           objectFit: 'cover',
                           cursor: 'pointer',
                        }}
                     />
                  </Card.Body>
               </Card>
            ))}
         </Flex>

         {/* Model Comparison Table */}
         <Text h3 css={{mb: '$6'}}>Perbandingan Parameter Model</Text>
         <Card css={{borderRadius: '$xl', bg: '$accents0', mb: '$12'}}>
            <Card.Body css={{p: 0, overflow: 'hidden'}}>
               <table style={{width: '100%', borderCollapse: 'collapse', fontFamily: 'Montserrat, sans-serif'}}>
                  <thead>
                     <tr style={{borderBottom: '1px solid var(--nextui-colors-border)'}}>
                        {['Model', 'Algoritma', 'Dimensi', 'Window Size', 'Min Count', 'Dokumen'].map((h) => (
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
                     {embeddingModels.map((model, i) => (
                        <tr
                           key={model.name}
                           style={{
                              borderBottom: i < embeddingModels.length - 1 ? '1px solid var(--nextui-colors-border)' : 'none',
                              transition: 'background 0.2s',
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
                                 <span style={{fontWeight: 600, color: 'var(--nextui-colors-accents9)'}}>
                                    {model.shortName}
                                 </span>
                              </Flex>
                           </td>
                           <td style={{padding: '14px 20px', color: 'var(--nextui-colors-accents7)', fontSize: '13px'}}>
                              {model.algorithm}
                           </td>
                           <td style={{padding: '14px 20px', color: 'var(--nextui-colors-accents9)', fontWeight: 600}}>
                              {model.dimensions}D
                           </td>
                           <td style={{padding: '14px 20px', color: 'var(--nextui-colors-accents7)'}}>
                              {model.windowSize}
                           </td>
                           <td style={{padding: '14px 20px', color: 'var(--nextui-colors-accents7)'}}>
                              {model.minCount}
                           </td>
                           <td style={{padding: '14px 20px', color: 'var(--nextui-colors-accents7)'}}>
                              {model.docs}
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </Card.Body>
         </Card>

         <Text h3 css={{mt: '$12', mb: '$6'}}>Evaluasi Model ML + Word Embedding</Text>
         <Card css={{borderRadius: '$xl', bg: '$accents0', border: '1px solid $accents2', mb: '$10'}}>
            <Card.Header css={{p: '$8', pb: '$0'}}>
               <Flex direction="column" css={{gap: '$2'}}>
                  <Text h4 css={{m: 0}}>Akurasi, Presisi, dan F1-Score</Text>
                  <Text span css={{color: '$accents7', fontSize: '$sm'}}>
                     Perbandingan performa Decision Tree (DT) dan Naive Bayes (NB) dengan berbagai macam Embedding Features 
                  </Text>
               </Flex>
            </Card.Header>
            <Card.Body css={{p: '$8', pt: '$4'}}>
               <EmbeddingEvaluationChart />
            </Card.Body>
         </Card>

         <Flex css={{mt: '$12', mb: '$6'}} justify="between" align="center">
             <Text h3 css={{m: 0}}>Matrix Detail Infographic</Text>
         </Flex>

         <Grid.Container gap={2} justify="center">
            {[
               { title: 'Decision Tree + W2V Skip-Gram', img: '/output/confusion_matrices/cm_dt_w2v_skip_gram.png' },
               { title: 'Naive Bayes + W2V Skip-Gram', img: '/output/confusion_matrices/cm_nb_w2v_skip_gram.png' },
               { title: 'Decision Tree + FastText', img: '/output/confusion_matrices/cm_dt_fasttext.png' },
               { title: 'Naive Bayes + FastText', img: '/output/confusion_matrices/cm_nb_fasttext.png' },
               { title: 'Decision Tree + W2V CBOW', img: '/output/confusion_matrices/cm_dt_w2v_cbow.png' },
               { title: 'Naive Bayes + W2V CBOW', img: '/output/confusion_matrices/cm_nb_w2v_cbow.png' },
               { title: 'Decision Tree + GloVe', img: '/output/confusion_matrices/cm_dt_glove.png' },
               { title: 'Naive Bayes + GloVe', img: '/output/confusion_matrices/cm_nb_glove.png' },
            ].map((item, idx) => (
               <Grid xs={12} sm={6} md={3} key={idx}>
                  <Card 
                     isHoverable 
                     isPressable 
                     css={{ w: '100%', bg: '$accents0', border: '1px solid $accents2' }}
                     onClick={() => setPreviewImage(item.img)}
                  >
                     <Card.Header css={{ p: '$4', zIndex: 1 }}>
                        <Text h5 css={{ m: 0, textAlign: 'center', width: '100%' }}>{item.title}</Text>
                     </Card.Header>
                     <Card.Body css={{ p: 0 }}>
                        <Card.Image
                           src={item.img}
                           objectFit="cover"
                           width="100%"
                           height={200}
                           alt={item.title}
                           css={{ bg: 'white', borderBottomLeftRadius: '$xl', borderBottomRightRadius: '$xl' }}
                        />
                     </Card.Body>
                  </Card>
               </Grid>
            ))}
         </Grid.Container>

         <Modal
            closeButton
            blur
            open={!!previewImage}
            onClose={() => setPreviewImage(null)}
            width="800px"
         >
            <Modal.Body css={{ p: '$10' }}>
               {previewImage && (
                  <img
                     src={previewImage}
                     alt="PCA Preview"
                     style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                  />
               )}
            </Modal.Body>
         </Modal>
      </Box>
   );
};

export default EmbeddingPage;
