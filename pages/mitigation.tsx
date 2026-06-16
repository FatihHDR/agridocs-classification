import type {NextPage} from 'next';
import React from 'react';
import {Text, Card, Grid, Badge} from '@nextui-org/react';
import {Box} from '../components/styles/box';
import {Flex} from '../components/styles/flex';
import Image from 'next/image';
import {mitigationExamples} from '../lib/mitigation-examples';

const MitigationPage: NextPage = () => {
   return (
      <Box css={{overflow: 'hidden', height: '100%', py: '$10', px: '$12'}}>
         <Text h2 css={{mb: '$2'}}>Mitigasi & Preprocessing Lanjutan</Text>
         <Text css={{color: '$accents7', mb: '$10'}}>
            Strategi pembersihan data dan rekayasa fitur khusus (Text Mitigation) untuk meningkatkan kualitas klasifikasi
         </Text>

         {/* Apa itu Text Mitigator */}
         <Card css={{
            borderRadius: '$xl',
            mb: '$10',
            background: 'linear-gradient(135deg, #10b981, #06b6d4)',
            overflow: 'hidden',
         }}>
            <Card.Body css={{py: '$10', px: '$10'}}>
               <Text h2 css={{color: 'white', mb: '$4'}}>
                  Text Mitigator (Custom Transformer)
               </Text>
               <Text css={{color: 'rgba(255,255,255,0.9)', mb: '$4', fontSize: '$sm', lineHeight: 1.7}}>
                  Dokumen pertanian publikasi ICAR seringkali mengandung noise yang mengganggu klasifikasi, seperti 
                  link URL, nomor ISSN, kalimat *boilerplate* hak cipta, dan karakter khusus. Kami membangun 
                  <strong> TextMitigator</strong>, sebuah Scikit-Learn Transformer kustom yang membersihkan noise ini 
                  sekaligus mengaplikasikan *Title Weighting*.
               </Text>
            </Card.Body>
         </Card>

         {/* 5 Langkah Mitigasi */}
         <Text h3 css={{mb: '$6'}}>5 Tahapan Text Mitigation</Text>
         <Grid.Container gap={2} css={{mb: '$12'}}>
            {[
               {
                  title: '1. Penghapusan URL',
                  desc: 'Menghapus pola `http://`, `https://`, dan `www.` yang sering muncul tapi tidak relevan dengan topik.',
                  color: '#ef4444'
               },
               {
                  title: '2. Penghapusan ISSN/ISO',
                  desc: 'Menghapus string nomor seri publikasi ilmiah seperti `ISSN No. X` dan `IS/ISO X` untuk mencegah overfitting pada angka acak.',
                  color: '#f59e0b'
               },
               {
                  title: '3. Boilerplate Removal',
                  desc: 'Menghapus kalimat repetitif bawaan publikasi seperti "All rights reserved", "Guidelines to Authors", dan "From the DG\'s Desk".',
                  color: '#8b5cf6'
               },
               {
                  title: '4. Title Weighting',
                  desc: 'Mengambil 250 karakter pertama dari setiap dokumen (yang biasanya adalah judul dokumen), dan mengalikan bobotnya (mengulang teksnya 2 kali).',
                  color: '#ec4899'
               },
               {
                  title: '5. Non-Alpha Removal',
                  desc: 'Membersihkan sisa karakter aneh (angka, simbol, BOM Unicode) sehingga yang tersisa hanya huruf alfabet murni ([a-zA-Z]).',
                  color: '#06b6d4'
               }
            ].map((step, idx) => (
               <Grid xs={12} sm={6} md={4} key={idx}>
                  <Card css={{bg: '$accents0', borderLeft: `4px solid ${step.color}`, p: '$2'}}>
                     <Card.Header>
                        <Text b css={{color: '$accents9'}}>{step.title}</Text>
                     </Card.Header>
                     <Card.Body css={{pt: 0}}>
                        <Text css={{color: '$accents7', fontSize: '$xs', lineHeight: 1.5}}>
                           {step.desc}
                        </Text>
                     </Card.Body>
                  </Card>
               </Grid>
            ))}
         </Grid.Container>

         {/* Contoh Before/After */}
         <Text h3 css={{mb: '$6'}}>Dampak Title Weighting (Ilustrasi)</Text>
         <Card css={{borderRadius: '$xl', bg: '$accents0', mb: '$12', border: '1px solid $accents2'}}>
            <Card.Body css={{p: 0, overflow: 'hidden'}}>
               <table style={{width: '100%', borderCollapse: 'collapse', fontFamily: 'Montserrat, sans-serif'}}>
                  <thead>
                     <tr style={{background: 'var(--nextui-colors-accents1)', borderBottom: '1px solid var(--nextui-colors-border)'}}>
                        <th style={{padding: '16px 20px', textAlign: 'left', width: '50%', color: 'var(--nextui-colors-accents8)'}}>Teks Original (Raw)</th>
                        <th style={{padding: '16px 20px', textAlign: 'left', width: '50%', color: 'var(--nextui-colors-accents8)'}}>Teks Mitigated (Preprocessed)</th>
                     </tr>
                  </thead>
                  <tbody>
                     {mitigationExamples.map((ex, idx) => (
                        <tr key={idx} style={{borderBottom: idx < mitigationExamples.length - 1 ? '1px solid var(--nextui-colors-border)' : 'none'}}>
                           <td style={{padding: '20px', verticalAlign: 'top', borderRight: '1px solid var(--nextui-colors-border)', width: '50%'}}>
                              <Badge color="secondary" css={{mb: '$4'}}>{ex.category}</Badge>
                              <Text css={{fontSize: '$sm', color: '$accents7', fontFamily: 'monospace', whiteSpace: 'pre-wrap', maxHeight: '300px', overflowY: 'auto'}}>
                                 {ex.raw}
                              </Text>
                           </td>
                           <td style={{padding: '20px', verticalAlign: 'top', width: '50%'}}>
                              <Text css={{fontSize: '$sm', color: '$accents9', fontFamily: 'monospace', whiteSpace: 'pre-wrap', maxHeight: '300px', overflowY: 'auto'}}>
                                 {ex.mitigated}
                              </Text>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </Card.Body>
         </Card>

         {/* Visualisasi Confusion Matrix Mitigated */}
         <Text h3 css={{mb: '$6'}}>Visualisasi Confusion Matrix (Mitigated)</Text>
         <Text css={{color: '$accents7', mb: '$8', fontSize: '$sm'}}>
            Berkat text mitigation dan *Title Weighting*, model SVM + TF-IDF mampu memisahkan teks dengan sangat akurat. 
            Berikut adalah Confusion Matrix dari prediksi model setelah menggunakan fitur `TextMitigator`.
         </Text>

         <Card css={{borderRadius: '$xl', bg: '$accents0', border: '1px solid $accents2', mb: '$8'}}>
            <Card.Body css={{p: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
               <img 
                  src="/cm_mitigated.png" 
                  alt="Confusion Matrix Mitigated" 
                  style={{maxWidth: '100%', height: 'auto', maxHeight: '600px', padding: '20px'}}
               />
            </Card.Body>
         </Card>
         
      </Box>
   );
};

export default MitigationPage;
