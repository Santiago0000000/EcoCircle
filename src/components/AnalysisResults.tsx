import React, { useState } from 'react';
import { RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface AnalysisResultsProps {
  results: {
    analysis: string;
    suggestions: string;
  } | null;
  uploadedImage: string | null;
  onReset: () => void;
  isLoading: boolean;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ 
  results, 
  uploadedImage,
  onReset,
  isLoading
}) => {
  const [expandedSections, setExpandedSections] = useState<{
    analysis: boolean;
    suggestions: boolean;
  }>({
    analysis: true,
    suggestions: true
  });

  const toggleSection = (section: 'analysis' | 'suggestions') => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const formatAnalysisText = (text: string) => {
    // Replace markdown-style headers with styled headers
    const formattedText = text
      .replace(/### (.*?)(\n|$)/g, '<h3 class="text-lg font-semibold mt-4 mb-2 text-primary-dark">$1</h3>')
      .replace(/## (.*?)(\n|$)/g, '<h2 class="text-xl font-semibold mt-5 mb-3 text-primary-dark">$1</h2>')
      .replace(/# (.*?)(\n|$)/g, '<h1 class="text-2xl font-bold mt-6 mb-4 text-primary-dark">$1</h1>');
    
    // Split by paragraphs and wrap them in p tags
    const paragraphs = formattedText.split('\n\n');
    
    return paragraphs
      .map(p => {
        if (p.trim() === '') return '';
        if (p.includes('<h1') || p.includes('<h2') || p.includes('<h3')) return p;
        return `<p class="mb-3">${p.replace(/\n/g, '<br>')}</p>`;
      })
      .join('');
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-heading font-semibold">Risultati dell'Analisi</h2>
        <button 
          onClick={onReset}
          className="btn bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center"
        >
          <RotateCcw size={16} className="mr-2" />
          Nuova Analisi
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          {uploadedImage && (
            <div className="card">
              <h3 className="section-title">Prodotto Analizzato</h3>
              <img 
                src={uploadedImage} 
                alt="Prodotto analizzato" 
                className="w-full h-auto rounded-lg mb-4" 
              />
              <p className="text-sm text-neutral-500 italic text-center">
                L'immagine caricata viene utilizzata solo per l'analisi e non viene salvata permanentemente.
              </p>
            </div>
          )}
        </div>
        
        <div className="md:col-span-2 space-y-6">
          {/* Analysis Section */}
          <div className="card">
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('analysis')}
            >
              <h3 className="section-title mb-0">Analisi del Prodotto</h3>
              <button className="text-neutral-500 hover:text-neutral-700">
                {expandedSections.analysis ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>
            </div>
            
            {expandedSections.analysis && (
              <div className="mt-4 animate-slide-up">
                {isLoading ? (
                  <Skeleton count={5} height={20} className="mb-2" />
                ) : results?.analysis ? (
                  <div 
                    className="prose prose-sm max-w-none text-neutral-700" 
                    dangerouslySetInnerHTML={{ __html: formatAnalysisText(results.analysis) }}
                  />
                ) : (
                  <p className="text-neutral-500 italic">Nessuna analisi disponibile.</p>
                )}
              </div>
            )}
          </div>
          
          {/* Suggestions Section */}
          <div className="card">
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('suggestions')}
            >
              <h3 className="section-title mb-0">Suggerimenti per Migliorare</h3>
              <button className="text-neutral-500 hover:text-neutral-700">
                {expandedSections.suggestions ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>
            </div>
            
            {expandedSections.suggestions && (
              <div className="mt-4 animate-slide-up">
                {isLoading ? (
                  <Skeleton count={6} height={20} className="mb-2" />
                ) : results?.suggestions ? (
                  <div 
                    className="prose prose-sm max-w-none text-neutral-700" 
                    dangerouslySetInnerHTML={{ __html: formatAnalysisText(results.suggestions) }}
                  />
                ) : (
                  <p className="text-neutral-500 italic">Nessun suggerimento disponibile.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;