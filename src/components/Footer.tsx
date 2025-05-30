import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-6 border-t border-neutral-200">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} EcoCircle - App Educativa per l'Economia Circolare
          </p>
          
          <div className="flex items-center mt-4 md:mt-0">
            <p className="text-sm text-neutral-500 flex items-center">
              Creato con <Heart size={14} className="text-accent mx-1" /> per l'ambiente
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;