
import React, { useState } from 'react';
import { Section } from './types';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Prd } from './components/Prd';
import { Roadmap } from './components/Roadmap';
import { Architecture } from './components/Architecture';
import { ApiStrategy } from './components/ApiStrategy';
import { DatabaseSchema } from './components/DatabaseSchema';
import { CostOptimization } from './components/CostOptimization';
import { RiskMitigation } from './components/RiskMitigation';
import { CodeSamples } from './components/CodeSamples';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(Section.Prd);

  const renderContent = () => {
    switch (activeSection) {
      case Section.Prd:
        return <Prd />;
      case Section.Roadmap:
        return <Roadmap />;
      case Section.Architecture:
        return <Architecture />;
      case Section.ApiStrategy:
        return <ApiStrategy />;
      case Section.DatabaseSchema:
        return <DatabaseSchema />;
      case Section.CostOptimization:
        return <CostOptimization />;
      case Section.RiskMitigation:
        return <RiskMitigation />;
      case Section.CodeSamples:
        return <CodeSamples />;
      default:
        return <Prd />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Header />
      <div className="container mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:space-x-6">
          <div className="md:sticky md:top-24 h-full mb-6 md:mb-0">
             <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
          </div>
          <main className="flex-1 bg-gray-800/30 p-6 md:p-8 rounded-lg border border-gray-700 min-w-0">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;