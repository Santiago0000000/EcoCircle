import React from 'react';
import { RecycleIcon, Leaf } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-5xl">
        <div className="flex items-center space-x-2">
          <div className="bg-primary rounded-lg p-2 flex items-center justify-center">
            <RecycleIcon size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-heading font-bold text-primary">EcoCircle</h1>
            <p className="text-xs text-neutral-500">Rendi i tuoi prodotti più sostenibili</p>
          </div>
        </div>
        
        <nav>
          <ul className="flex items-center space-x-6">
            <li>
              <a href="#" className="text-neutral-600 hover:text-primary flex items-center">
                <Leaf size={16} className="mr-1" />
                <span>Informazioni</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;