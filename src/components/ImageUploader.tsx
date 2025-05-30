import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image, X, Loader2 } from 'lucide-react';

interface ImageUploaderProps {
  uploadedImage: string | null;
  setUploadedImage: (image: string | null) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  uploadedImage, 
  setUploadedImage,
  onAnalyze,
  isAnalyzing
}) => {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    
    if (acceptedFiles.length === 0) {
      return;
    }
    
    const file = acceptedFiles[0];
    
    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('Il file è troppo grande. La dimensione massima è di 10MB.');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, [setUploadedImage]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/gif': []
    },
    maxFiles: 1
  });
  
  const removeImage = () => {
    setUploadedImage(null);
    setError(null);
  };
  
  return (
    <div className="w-full">
      {!uploadedImage ? (
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors ${
            isDragActive 
              ? 'border-primary bg-primary/5' 
              : 'border-neutral-300 hover:border-primary/50 hover:bg-neutral-50'
          }`}
        >
          <input {...getInputProps()} />
          
          <div className="bg-primary/10 p-4 rounded-full mb-4">
            <Upload size={32} className="text-primary" />
          </div>
          
          <p className="text-neutral-600 text-center mb-2">
            {isDragActive 
              ? 'Rilascia la foto qui...' 
              : 'Clicca per caricare una foto'}
          </p>
          <p className="text-neutral-400 text-sm text-center">
            Supporta JPG, PNG, GIF (max 10MB)
          </p>
          
          {error && (
            <p className="mt-4 text-error text-sm">{error}</p>
          )}
        </div>
      ) : (
        <div className="animate-fade-in">
          <div className="relative mb-6">
            <img 
              src={uploadedImage} 
              alt="Prodotto caricato" 
              className="w-full h-auto max-h-80 object-contain rounded-lg mx-auto"
            />
            <button 
              onClick={removeImage}
              className="absolute top-2 right-2 bg-white/80 p-1 rounded-full hover:bg-white focus:outline-none"
              aria-label="Rimuovi immagine"
            >
              <X size={20} className="text-neutral-700" />
            </button>
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={onAnalyze}
              disabled={isAnalyzing}
              className="btn-primary flex items-center justify-center min-w-40"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 size={18} className="mr-2 animate-spin" />
                  Analisi in corso...
                </>
              ) : (
                <>
                  <Image size={18} className="mr-2" />
                  Analizza Prodotto
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;