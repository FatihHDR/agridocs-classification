import type { NextPage } from 'next';
import React from 'react';
import { Text, Card, Badge, Button } from '@nextui-org/react';
import { Box } from '../components/styles/box';
import { Flex } from '../components/styles/flex';
import { classificationReports, scenarioComparison } from '../lib/nlp-data';
import dynamic from 'next/dynamic';
import { TextClassifier } from '../components/home/text-classifier';

const ClassificationMetricsChart = dynamic(
   () => import('../components/charts/classification-metrics-chart').then((mod) => mod.ClassificationMetricsChart),
   { ssr: false }
);

const MODEL_KEYS = Object.keys(classificationReports);

const FAMILY_COLORS: Record<string, string> = {
   'Classical ML':      '#6366f1',
   'Non-Contextual WE': '#06b6d4',
   'Contextual WE':     '#10b981',
};

const ClassificationPage: NextPage = () => {
   const [selectedModel, setSelectedModel] = React.useState<string>('TF-IDF + SVM');
   const [scenarioTab, setScenarioTab] = React.useState<'all' | 'classical' | 'we' | 'bert'>('all');

   const report = classificationReports[selectedModel];

   const filteredScenario = scenarioComparison.filter((r) => {
      if (scenarioTab === 'classical') return r.family === 'Classical ML';
      if (scenarioTab === 'we')        return r.family === 'Non-Contextual WE';
      if (scenarioTab === 'bert')      return r.family === 'Contextual WE';
      return true;
   });

   return (
      <Box css={{ overflow: 'hidden', height: '100%', py: '$10', px: '$12' }}>
         <Text h2 css={{ mb: '$2' }}>Hasil Klasifikasi</Text>
         <Text css={{ color: '$accents7', mb: '$10' }}>
            Evaluasi performa model klasifikasi teks pada dataset ICAR Agriculture — Skenario S1 (Data Asli) &amp; S2 (Data + Augmentasi)
         </Text>

         {/* ── Text Classification Playground ── */}
         <Text h3 css={{ mb: '$2' }}>Classification Playground</Text>
         <Text css={{ color: '$accents7', mb: '$6', fontSize: '$sm' }}>
            Masukkan kalimat bebas — model akan menentukan kategorinya secara otomatis.
         </Text>
         <TextClassifier />

         {/* Divider */}
         <Box css={{ my: '$12', borderTop: '1px solid $accents2' }} />

         {/* ── S1 vs S2 Scenario Comparison ── */}
         <Text h3 css={{ mb: '$2' }}>Perbandingan Skenario S1 vs S2</Text>
         <Text css={{ color: '$accents7', mb: '$6', fontSize: '$sm' }}>
            <strong>S1</strong>: Dilatih data asli → Diuji data asli &nbsp;|&nbsp;
            <strong>S2</strong>: Dilatih data + augmentasi → Diuji data asli
         </Text>

         {/* Filter tabs */}
         <Flex css={{ gap: '$3', mb: '$6', flexWrap: 'wrap' }}>
            {([['all', 'Semua Model'], ['classical', 'Classical ML'], ['we', 'Non-Contextual WE'], ['bert', 'BERT']] as const).map(([key, label]) => (
               <Button
                  key={key}
                  size="sm"
                  auto
                  flat={scenarioTab !== key}
                  color={scenarioTab === key ? 'primary' : 'default'}
                  onClick={() => setScenarioTab(key)}
               >
                  {label}
               </Button>
            ))}
         </Flex>

         <Card css={{ borderRadius: '$xl', bg: '$accents0', mb: '$12' }}>
            <Card.Body css={{ p: 0, overflow: 'auto' }}>
               <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Montserrat, sans-serif', minWidth: '700px' }}>
                  <thead>
                     <tr style={{ borderBottom: '1px solid var(--nextui-colors-border)' }}>
                        {['Family', 'Representasi', 'Classifier', 'S1 Accuracy', 'S2 Accuracy', 'Gain'].map((h) => (
                           <th key={h} style={{
                              padding: '12px 16px',
                              textAlign: 'left',
                              fontSize: '11px',
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
                     {filteredScenario.map((row, i) => (
                        <tr
                           key={i}
                           style={{
                              borderBottom: '1px solid var(--nextui-colors-border)',
                              background: row.s1 === Math.max(...scenarioComparison.map(r => r.s1)) ? 'rgba(99,102,241,0.04)' : 'transparent',
                           }}
                        >
                           <td style={{ padding: '12px 16px' }}>
                              <span style={{
                                 display: 'inline-block',
                                 padding: '2px 8px',
                                 borderRadius: '6px',
                                 fontSize: '11px',
                                 fontWeight: 600,
                                 background: FAMILY_COLORS[row.family] + '22',
                                 color: FAMILY_COLORS[row.family],
                              }}>{row.family}</span>
                           </td>
                           <td style={{ padding: '12px 16px', fontSize: '13px', color: 'var(--nextui-colors-accents8)', fontWeight: 500 }}>{row.representation}</td>
                           <td style={{ padding: '12px 16px', fontSize: '13px', color: 'var(--nextui-colors-accents7)' }}>{row.classifier}</td>
                           <td style={{ padding: '12px 16px' }}>
                              <Flex align="center" css={{ gap: '$2' }}>
                                 <span style={{ fontWeight: 700, fontSize: '14px', color: '#6366f1', minWidth: '52px' }}>{row.s1.toFixed(2)}%</span>
                                 <Box css={{ width: '70px', height: '5px', bg: '$accents2', borderRadius: '$full', overflow: 'hidden' }}>
                                    <Box css={{ width: `${row.s1}%`, height: '100%', background: '#6366f1', borderRadius: '$full' }} />
                                 </Box>
                              </Flex>
                           </td>
                           <td style={{ padding: '12px 16px' }}>
                              {row.s2 !== null ? (
                                 <Flex align="center" css={{ gap: '$2' }}>
                                    <span style={{ fontWeight: 700, fontSize: '14px', color: '#8b5cf6', minWidth: '52px' }}>{row.s2!.toFixed(2)}%</span>
                                    <Box css={{ width: '70px', height: '5px', bg: '$accents2', borderRadius: '$full', overflow: 'hidden' }}>
                                       <Box css={{ width: `${row.s2}%`, height: '100%', background: '#8b5cf6', borderRadius: '$full' }} />
                                    </Box>
                                 </Flex>
                              ) : <span style={{ color: 'var(--nextui-colors-accents5)', fontSize: '12px' }}>—</span>}
                           </td>
                           <td style={{ padding: '12px 16px' }}>
                              {row.gain !== null ? (
                                 <span style={{
                                    fontWeight: 700,
                                    fontSize: '13px',
                                    color: row.gain! > 0 ? '#10b981' : row.gain! < 0 ? '#ef4444' : 'var(--nextui-colors-accents6)',
                                 }}>
                                    {row.gain! > 0 ? '+' : ''}{row.gain!.toFixed(2)}%
                                 </span>
                              ) : <span style={{ color: 'var(--nextui-colors-accents5)', fontSize: '12px' }}>—</span>}
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </Card.Body>
         </Card>

         {/* Divider */}
         <Box css={{ my: '$4', borderTop: '1px solid $accents2' }} />

         {/* ── Classification Report per Model ── */}
         <Text h3 css={{ mb: '$2', mt: '$10' }}>Classification Report Per Kelas</Text>
         <Text css={{ color: '$accents7', mb: '$6', fontSize: '$sm' }}>
            Pilih model untuk melihat detail Precision, Recall, dan F1-Score per kelas (Skenario S1 — Data Asli)
         </Text>

         {/* Model selector */}
         <Flex css={{ gap: '$3', mb: '$6', flexWrap: 'wrap' }}>
            {MODEL_KEYS.map((key) => (
               <Button
                  key={key}
                  size="sm"
                  auto
                  flat={selectedModel !== key}
                  color={selectedModel === key ? 'secondary' : 'default'}
                  onClick={() => setSelectedModel(key)}
               >
                  {key}
               </Button>
            ))}
         </Flex>

         {/* Accuracy banner */}
         <Card css={{
            borderRadius: '$xl',
            mb: '$6',
            background: `linear-gradient(135deg, #6366f1, #8b5cf6)`,
         }}>
            <Card.Body css={{ py: '$6', px: '$8' }}>
               <Flex justify="between" align="center" css={{ flexWrap: 'wrap', gap: '$6' }}>
                  <div>
                     <Text css={{ color: 'rgba(255,255,255,0.7)', fontSize: '$xs', mb: '$1' }}>Model</Text>
                     <Text b css={{ color: 'white', fontSize: '$lg' }}>{selectedModel}</Text>
                  </div>
                  <div>
                     <Text css={{ color: 'rgba(255,255,255,0.7)', fontSize: '$xs', mb: '$1' }}>Accuracy (S1)</Text>
                     <Text b css={{ color: 'white', fontSize: '2rem', lineHeight: 1 }}>{report.accuracy.toFixed(2)}%</Text>
                  </div>
                  <div>
                     <Text css={{ color: 'rgba(255,255,255,0.7)', fontSize: '$xs', mb: '$1' }}>Macro F1</Text>
                     <Text b css={{ color: 'white', fontSize: '2rem', lineHeight: 1 }}>
                        {((report.perClass.reduce((a, c) => a + c.f1, 0) / report.perClass.length) * 100).toFixed(2)}%
                     </Text>
                  </div>
                  <div>
                     <Text css={{ color: 'rgba(255,255,255,0.7)', fontSize: '$xs', mb: '$1' }}>Test Samples</Text>
                     <Text b css={{ color: 'white', fontSize: '2rem', lineHeight: 1 }}>32</Text>
                  </div>
               </Flex>
            </Card.Body>
         </Card>

         {/* Per-class table */}
         <Card css={{ borderRadius: '$xl', bg: '$accents0', mb: '$12' }}>
            <Card.Body css={{ p: 0, overflow: 'hidden' }}>
               <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Montserrat, sans-serif' }}>
                  <thead>
                     <tr style={{ borderBottom: '1px solid var(--nextui-colors-border)' }}>
                        {['Kelas', 'Precision', 'Recall', 'F1-Score', 'Support', 'Status'].map((h) => (
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
                     {report.perClass.map((cls, i) => (
                        <tr
                           key={cls.label}
                           style={{ borderBottom: i < report.perClass.length - 1 ? '1px solid var(--nextui-colors-border)' : 'none' }}
                        >
                           <td style={{ padding: '14px 20px' }}>
                              <span style={{ fontWeight: 600, color: 'var(--nextui-colors-accents9)', fontSize: '13px' }}>
                                 {cls.label}
                              </span>
                           </td>
                           <td style={{ padding: '14px 20px' }}>
                              <Flex align="center" css={{ gap: '$3' }}>
                                 <span style={{ fontWeight: 600, minWidth: '38px', color: 'var(--nextui-colors-accents9)' }}>
                                    {(cls.precision * 100).toFixed(0)}%
                                 </span>
                                 <Box css={{ width: '60px', height: '4px', bg: '$accents2', borderRadius: '$full', overflow: 'hidden' }}>
                                    <Box css={{ width: `${cls.precision * 100}%`, height: '100%', background: '#8b5cf6', borderRadius: '$full' }} />
                                 </Box>
                              </Flex>
                           </td>
                           <td style={{ padding: '14px 20px' }}>
                              <Flex align="center" css={{ gap: '$3' }}>
                                 <span style={{ fontWeight: 600, minWidth: '38px', color: 'var(--nextui-colors-accents9)' }}>
                                    {(cls.recall * 100).toFixed(0)}%
                                 </span>
                                 <Box css={{ width: '60px', height: '4px', bg: '$accents2', borderRadius: '$full', overflow: 'hidden' }}>
                                    <Box css={{ width: `${cls.recall * 100}%`, height: '100%', background: '#06b6d4', borderRadius: '$full' }} />
                                 </Box>
                              </Flex>
                           </td>
                           <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--nextui-colors-accents9)' }}>
                              {(cls.f1 * 100).toFixed(0)}%
                           </td>
                           <td style={{ padding: '14px 20px', color: 'var(--nextui-colors-accents7)' }}>
                              {cls.support}
                           </td>
                           <td style={{ padding: '14px 20px' }}>
                              <span style={{
                                 padding: '3px 10px',
                                 borderRadius: '12px',
                                 fontSize: '11px',
                                 fontWeight: 600,
                                 background: cls.f1 >= 0.85 ? 'rgba(16,185,129,0.15)' : cls.f1 >= 0.6 ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)',
                                 color: cls.f1 >= 0.85 ? '#10b981' : cls.f1 >= 0.6 ? '#f59e0b' : '#ef4444',
                              }}>
                                 {cls.f1 >= 0.85 ? 'Sangat Baik' : cls.f1 >= 0.6 ? 'Baik' : 'Perlu Perbaikan'}
                              </span>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </Card.Body>
         </Card>

         {/* Chart */}
         <Text h3 css={{ mb: '$6' }}>Visualisasi Metrik — TF-IDF + SVM (Terbaik)</Text>
         <Card css={{ borderRadius: '$xl', bg: '$accents0', mb: '$12' }}>
            <Card.Body css={{ py: '$6', px: '$6' }}>
               <ClassificationMetricsChart />
            </Card.Body>
         </Card>

         {/* Methodology note */}
         <Card css={{ borderRadius: '$xl', bg: '$accents0', border: '1px solid $accents2' }}>
            <Card.Body css={{ py: '$6', px: '$8' }}>
               <Text b css={{ mb: '$2', color: '$accents9' }}>Catatan Metodologi</Text>
               <Text css={{ color: '$accents7', fontSize: '$sm', lineHeight: 1.7 }}>
                  Semua model dilatih pada <strong>train_original.csv</strong> (S1) dan diuji pada <strong>test_original.csv</strong> yang bebas augmentasi.
                  Split dilakukan <strong>sebelum</strong> augmentasi back-translation (80:20 stratified) untuk mencegah <em>data leakage</em>.
                  Back-translation menggunakan 4 rute bahasa secara bergantian: <strong>ID↔EN, ID↔JP, ID↔CN, ID↔RU</strong>.
                  BERT menggunakan model <code>distilbert-base-multilingual-cased</code> dengan mean-pooling (tanpa fine-tuning).
               </Text>
            </Card.Body>
         </Card>
      </Box>
   );
};

export default ClassificationPage;
