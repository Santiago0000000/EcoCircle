import { useState, useCallback } from 'react';

interface AnalysisResults {
  analysis: string;
  suggestions: string;
}

export const useProductAnalysis = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null);

  const OPENROUTER_API_KEY = "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";
  
  const analyzeProduct = useCallback(async () => {
    if (!uploadedImage) return;
    
    setIsAnalyzing(true);
    
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": window.location.origin,
          "X-Title": "EcoCircle App",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "qwen/qwen2.5-vl-3b-instruct:free",
          "messages": [
            {
              "role": "system",
              "content": `Sei un'AI integrata in un'app educativa italiana che introduce gli studenti all'educazione ambientale e all'economia circolare

Il tuo compito è, data l'immagine di un prodotto, quello di:

1. Fare ricerche e scrivere un breve report sull'impatto ambientale e gli sprechi legati a quel prodotto analizzando: materie prime, costi energetici, filiera industriale, durevolezza del prodotto, utilizzo dell'utente nel tempo. 
2. Trovare soluzioni innovative e originali per rendere il prodotto più circolare ed eco-friendly facendo una stima dei costi il più accurata possibile, basandoti sul tuo report. Se esistono già aziende che operano in quel campo citale oppure ispirati alla loro soluzione

L'output che andrai a generare dovrà essere strutturato in questo modo:

Analisi prodotto:

<esegui il punto 1>

Suggerimenti per migliorare

<esegui punto 2>`
            },
            {
              "role": "user",
              "content": [
                {
                  "type": "text",
                  "text": "Analizza questo prodotto e suggerisci come renderlo più sostenibile ed eco-friendly."
                },
                {
                  "type": "image_url",
                  "image_url": {
                    "url": uploadedImage
                  }
                }
              ]
            }
          ]
        })
      });
      
      const data = await response.json();
      
      if (data.choices && data.choices[0] && data.choices[0].message) {
        const content = data.choices[0].message.content;
        
        // Parsing the content to extract analysis and suggestions
        const analysisPart = content.includes('Analisi prodotto:') 
          ? content.split('Analisi prodotto:')[1].split('Suggerimenti per migliorare')[0].trim()
          : '';
          
        const suggestionsPart = content.includes('Suggerimenti per migliorare') 
          ? content.split('Suggerimenti per migliorare')[1].trim()
          : '';
        
        setAnalysisResults({
          analysis: analysisPart,
          suggestions: suggestionsPart
        });
      }
    } catch (error) {
      console.error('Error analyzing product:', error);
      // You could add error handling UI here
    } finally {
      setIsAnalyzing(false);
    }
  }, [uploadedImage, OPENROUTER_API_KEY]);
  
  const resetAnalysis = useCallback(() => {
    setUploadedImage(null);
    setAnalysisResults(null);
  }, []);

  return {
    uploadedImage,
    setUploadedImage,
    isAnalyzing,
    analysisResults,
    analyzeProduct,
    resetAnalysis
  };
};