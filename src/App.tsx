import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ImageUploader from './components/ImageUploader';
import AnalysisResults from './components/AnalysisResults';
import { useProductAnalysis } from './hooks/useProductAnalysis';

function App() {
  const { 
    uploadedImage, 
    setUploadedImage, 
    isAnalyzing,
    analysisResults,
    analyzeProduct,
    resetAnalysis
  } = useProductAnalysis();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
        {!analysisResults ? (
          <div className="card animate-fade-in">
            <h2 className="text-2xl font-heading font-semibold text-center mb-6">
              📸 Analizza un Prodotto
            </h2>
            <p className="text-center text-neutral-600 mb-8">
              Carica la foto di un prodotto e scopri come renderlo più eco-friendly!
            </p>
            
            <ImageUploader 
              uploadedImage={uploadedImage}
              setUploadedImage={setUploadedImage}
              onAnalyze={analyzeProduct}
              isAnalyzing={isAnalyzing}
            />
          </div>
        ) : (
          <AnalysisResults 
            results={analysisResults} 
            uploadedImage={uploadedImage}
            onReset={resetAnalysis}
            isLoading={isAnalyzing}
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;