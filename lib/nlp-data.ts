// NLP Dashboard Data - Hasil dari modeling dan klasifikasi ICAR dataset

export const datasetInfo = {
  name: 'ICAR Agriculture Dataset',
  totalDocs: 159,
  totalDocsAugmented: 258,  // train_aug (258) + test (32) = 290 total, 258 training
  categories: 6,
  augmentationMethod: 'Back Translation 4 Rute (ID↔EN, ID↔JP, ID↔CN, ID↔RU)',
  trainSize: 127,
  testSize: 32,
  trainAugSize: 258,
};

export const categoryDistribution = [
  { name: 'Books', original: 54, augmented: 54, color: '#6366f1' },
  { name: 'Reports', original: 47, augmented: 54, color: '#8b5cf6' },
  { name: 'Indian Farming', original: 23, augmented: 54, color: '#06b6d4' },
  { name: 'Indian Horticulture', original: 18, augmented: 54, color: '#10b981' },
  { name: 'Annual Reports', original: 10, augmented: 54, color: '#f59e0b' },
  { name: 'Traditional Knowledge', original: 7, augmented: 54, color: '#ec4899' },
];

export const embeddingModels = [
  {
    name: 'Word2Vec CBOW',
    shortName: 'W2V-CBOW',
    dimensions: 100,
    algorithm: 'Continuous Bag of Words',
    windowSize: 5,
    minCount: 2,
    docs: 324,
    color: '#6366f1',
    file: 'doc_embeddings_w2v_cbow.csv',
    description: 'Menggunakan konteks sekitar untuk memprediksi kata target',
  },
  {
    name: 'Word2Vec Skip-gram',
    shortName: 'W2V-SG',
    dimensions: 100,
    algorithm: 'Skip-gram',
    windowSize: 5,
    minCount: 2,
    docs: 324,
    color: '#8b5cf6',
    file: 'doc_embeddings_w2v_skipgram.csv',
    description: 'Menggunakan kata target untuk memprediksi konteks sekitar',
  },
  {
    name: 'GloVe',
    shortName: 'GloVe',
    dimensions: 100,
    algorithm: 'Global Vectors',
    windowSize: 10,
    minCount: 1,
    docs: 324,
    color: '#06b6d4',
    file: 'doc_embeddings_glove.csv',
    description: 'Memanfaatkan statistik global co-occurrence kata',
  },
  {
    name: 'FastText',
    shortName: 'FastText',
    dimensions: 100,
    algorithm: 'FastText (Subword)',
    windowSize: 5,
    minCount: 1,
    docs: 324,
    color: '#10b981',
    file: 'doc_embeddings_fasttext.csv',
    description: 'Memperhitungkan subword/n-gram untuk representasi vektor',
  },
];

export const topFeaturesTFIDF = [
  { feature: 'yield', score: 0.04536 },
  { feature: 'farming', score: 0.03670 },
  { feature: 'pradesh', score: 0.03083 },
  { feature: 'days', score: 0.03040 },
  { feature: 'fruit', score: 0.03022 },
  { feature: 'rice', score: 0.02929 },
  { feature: 'varieties', score: 0.02866 },
  { feature: 'cultivation', score: 0.02549 },
  { feature: 'variety', score: 0.02390 },
  { feature: 'income', score: 0.02211 },
  { feature: 'wheat', score: 0.02055 },
  { feature: 'millet', score: 0.02048 },
  { feature: 'fruits', score: 0.02001 },
  { feature: 'leaf', score: 0.01998 },
  { feature: 'plants', score: 0.01834 },
];

export const augmentationImpact = [
  { feature: 'prac', ngramSize: 1, before: 0, after: 244, change: 100 },
  { feature: 'nicgw', ngramSize: 1, before: 45, after: 181, change: 302.2 },
  { feature: 'cas', ngramSize: 1, before: 111, after: 242, change: 118.0 },
  { feature: 'mon', ngramSize: 1, before: 107, after: 195, change: 82.2 },
  { feature: 'qdty', ngramSize: 1, before: 0, after: 80, change: 100 },
  { feature: 'ingr', ngramSize: 1, before: 163, after: 229, change: 40.5 },
  { feature: 'mtu', ngramSize: 1, before: 188, after: 244, change: 29.8 },
  { feature: 'singh', ngramSize: 1, before: 4023, after: 4076, change: 1.3 },
];

// ── Perbandingan Skenario S1 vs S2 ─────────────────────────────────────────
// S1 = Dilatih data asli → Diuji data asli
// S2 = Dilatih data+augmentasi → Diuji data asli
export const scenarioComparison = [
  // Classical ML
  { family: 'Classical ML', representation: 'TF-IDF (1-2)', classifier: 'SVM',           s1: 87.50, s2: 84.38, gain: -3.12 },
  { family: 'Classical ML', representation: 'TF-IDF (1-2)', classifier: 'Decision Tree', s1: 81.25, s2: 78.12, gain: -3.12 },
  { family: 'Classical ML', representation: 'TF-IDF (1-2)', classifier: 'Naive Bayes',   s1: 50.00, s2: 56.25, gain: +6.25 },
  { family: 'Classical ML', representation: 'BoW (Unigram)', classifier: 'SVM',          s1: 68.75, s2: 75.00, gain: +6.25 },
  { family: 'Classical ML', representation: 'BoW (Unigram)', classifier: 'Decision Tree', s1: 65.62, s2: 71.88, gain: +6.25 },
  { family: 'Classical ML', representation: 'BoW (Unigram)', classifier: 'Naive Bayes',  s1: 68.75, s2: 68.75, gain:  0.00 },
  { family: 'Classical ML', representation: 'N-Gram (1-2)', classifier: 'SVM',           s1: 68.75, s2: 65.62, gain: -3.12 },
  { family: 'Classical ML', representation: 'N-Gram (1-2)', classifier: 'Decision Tree', s1: 84.38, s2: 81.25, gain: -3.12 },  // sebelumnya 84.38 → setelah BOM fix 81.25
  { family: 'Classical ML', representation: 'N-Gram (1-2)', classifier: 'Naive Bayes',   s1: 71.88, s2: 71.88, gain:  0.00 },
  // Non-Contextual WE
  { family: 'Non-Contextual WE', representation: 'Word2Vec SG',  classifier: 'SVM', s1: 65.62, s2: 68.75, gain: +3.12 },
  { family: 'Non-Contextual WE', representation: 'Word2Vec CBOW', classifier: 'SVM', s1: 75.00, s2: 68.75, gain: -6.25 },
  { family: 'Non-Contextual WE', representation: 'FastText',      classifier: 'SVM', s1: 71.88, s2: 65.62, gain: -6.25 },
  // Contextual WE (BERT)
  { family: 'Contextual WE',    representation: 'BERT (mBERT)', classifier: 'SVM',           s1: 84.38, s2: 81.25, gain: -3.12 },
  { family: 'Contextual WE',    representation: 'BERT (mBERT)', classifier: 'Decision Tree',  s1: 71.88, s2: null,  gain: null  },
  { family: 'Contextual WE',    representation: 'BERT (mBERT)', classifier: 'Naive Bayes',    s1: 81.25, s2: null,  gain: null  },
];

// ── Classification Report per kelas (S1 only) ──────────────────────────────
export interface ClassReport {
  label: string;
  precision: number;
  recall: number;
  f1: number;
  support: number;
}

export const classificationReports: Record<string, { accuracy: number; perClass: ClassReport[] }> = {
  'TF-IDF + SVM': {
    accuracy: 87.50,
    perClass: [
      { label: 'Annual Reports',                       precision: 1.00, recall: 1.00, f1: 1.00, support: 2  },
      { label: 'Books',                                precision: 0.89, recall: 0.73, f1: 0.80, support: 11 },
      { label: 'Indian Farming',                       precision: 1.00, recall: 0.80, f1: 0.89, support: 5  },
      { label: 'Indian Horticulture',                  precision: 1.00, recall: 1.00, f1: 1.00, support: 4  },
      { label: 'Reports',                              precision: 0.75, recall: 1.00, f1: 0.86, support: 9  },
      { label: 'Traditional Knowledge in Agriculture', precision: 1.00, recall: 1.00, f1: 1.00, support: 1  },
    ],
  },
  'TF-IDF + Decision Tree': {
    accuracy: 81.25,
    perClass: [
      { label: 'Annual Reports',                       precision: 0.50, recall: 0.50, f1: 0.50, support: 2  },
      { label: 'Books',                                precision: 0.77, recall: 0.91, f1: 0.83, support: 11 },
      { label: 'Indian Farming',                       precision: 1.00, recall: 0.60, f1: 0.75, support: 5  },
      { label: 'Indian Horticulture',                  precision: 1.00, recall: 1.00, f1: 1.00, support: 4  },
      { label: 'Reports',                              precision: 0.88, recall: 0.78, f1: 0.82, support: 9  },
      { label: 'Traditional Knowledge in Agriculture', precision: 0.50, recall: 1.00, f1: 0.67, support: 1  },
    ],
  },
  'TF-IDF + Naive Bayes': {
    accuracy: 50.00,
    perClass: [
      { label: 'Annual Reports',                       precision: 0.00, recall: 0.00, f1: 0.00, support: 2  },
      { label: 'Books',                                precision: 0.35, recall: 0.55, f1: 0.43, support: 11 },
      { label: 'Indian Farming',                       precision: 0.00, recall: 0.00, f1: 0.00, support: 5  },
      { label: 'Indian Horticulture',                  precision: 1.00, recall: 0.50, f1: 0.67, support: 4  },
      { label: 'Reports',                              precision: 0.62, recall: 0.89, f1: 0.73, support: 9  },
      { label: 'Traditional Knowledge in Agriculture', precision: 0.00, recall: 0.00, f1: 0.00, support: 1  },
    ],
  },
  'N-Gram + Decision Tree': {
    accuracy: 81.25,
    perClass: [
      { label: 'Annual Reports',                       precision: 1.00, recall: 1.00, f1: 1.00, support: 2  },
      { label: 'Books',                                precision: 0.71, recall: 0.91, f1: 0.80, support: 11 },
      { label: 'Indian Farming',                       precision: 0.75, recall: 0.60, f1: 0.67, support: 5  },
      { label: 'Indian Horticulture',                  precision: 1.00, recall: 1.00, f1: 1.00, support: 4  },
      { label: 'Reports',                              precision: 0.88, recall: 0.78, f1: 0.82, support: 9  },
      { label: 'Traditional Knowledge in Agriculture', precision: 0.00, recall: 0.00, f1: 0.00, support: 1  },
    ],
  },
  'BERT + SVM': {
    accuracy: 84.38,
    perClass: [
      { label: 'Annual Reports',                       precision: 1.00, recall: 0.50, f1: 0.67, support: 2  },
      { label: 'Books',                                precision: 0.82, recall: 0.82, f1: 0.82, support: 11 },
      { label: 'Indian Farming',                       precision: 1.00, recall: 1.00, f1: 1.00, support: 5  },
      { label: 'Indian Horticulture',                  precision: 1.00, recall: 1.00, f1: 1.00, support: 4  },
      { label: 'Reports',                              precision: 0.70, recall: 0.78, f1: 0.74, support: 9  },
      { label: 'Traditional Knowledge in Agriculture', precision: 1.00, recall: 1.00, f1: 1.00, support: 1  },
    ],
  },
  'BERT + Decision Tree': {
    accuracy: 71.88,
    perClass: [
      { label: 'Annual Reports',                       precision: 0.33, recall: 0.50, f1: 0.40, support: 2  },
      { label: 'Books',                                precision: 0.67, recall: 0.73, f1: 0.70, support: 11 },
      { label: 'Indian Farming',                       precision: 0.83, recall: 1.00, f1: 0.91, support: 5  },
      { label: 'Indian Horticulture',                  precision: 0.80, recall: 1.00, f1: 0.89, support: 4  },
      { label: 'Reports',                              precision: 0.83, recall: 0.56, f1: 0.67, support: 9  },
      { label: 'Traditional Knowledge in Agriculture', precision: 0.00, recall: 0.00, f1: 0.00, support: 1  },
    ],
  },
  'BERT + Naive Bayes': {
    accuracy: 81.25,
    perClass: [
      { label: 'Annual Reports',                       precision: 1.00, recall: 0.50, f1: 0.67, support: 2  },
      { label: 'Books',                                precision: 0.75, recall: 0.82, f1: 0.78, support: 11 },
      { label: 'Indian Farming',                       precision: 1.00, recall: 0.80, f1: 0.89, support: 5  },
      { label: 'Indian Horticulture',                  precision: 1.00, recall: 1.00, f1: 1.00, support: 4  },
      { label: 'Reports',                              precision: 0.70, recall: 0.78, f1: 0.74, support: 9  },
      { label: 'Traditional Knowledge in Agriculture', precision: 1.00, recall: 1.00, f1: 1.00, support: 1  },
    ],
  },
};

// For backward compatibility
export const classificationResults = {
  tfidf: {
    method: 'TF-IDF + SVM (S1)',
    accuracy: 0.875,
    precision: 0.94,
    recall: 0.92,
    f1Score: 0.92,
    perClass: classificationReports['TF-IDF + SVM'].perClass,
  },
};

export const pipelineSteps = [
  { step: 1, name: 'Data Collection', status: 'done', description: '159 dokumen ICAR' },
  { step: 2, name: 'Preprocessing', status: 'done', description: 'Tokenisasi, stopword removal, stemming' },
  { step: 3, name: 'Train-Test Split', status: 'done', description: '80:20 stratified sebelum augmentasi' },
  { step: 4, name: 'Augmentasi', status: 'done', description: 'Back-translation 4 rute (EN/JP/CN/RU) → 258 training docs' },
  { step: 5, name: 'Feature Extraction', status: 'done', description: 'TF-IDF, BoW, n-gram' },
  { step: 6, name: 'Word Embedding', status: 'done', description: 'W2V, GloVe, FastText, BERT (mBERT)' },
  { step: 7, name: 'Classification', status: 'done', description: 'SVM, Decision Tree, Naive Bayes' },
];
