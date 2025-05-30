import React, { useState, useEffect } from 'react';
import ModuleSidebar from './ModuleSidebar';
import BuilderCanvas from './BuilderCanvas';
import PreviewPanel from './PreviewPanel';
import { Button } from '@/components/ui/button';
import { Play, Save, Download, Settings } from 'lucide-react';

const clevergyDefaultVars = {
  '--clevergy-font-family': 'Inter, system-ui, sans-serif',
  '--clevergy-color-primary': '#0d9488',
  '--clevergy-color-secondary': '#FEC639',
  '--clevergy-color-text': '#171717',
  '--clevergy-color-subtext': '#737373',
  '--clevergy-color-unselected': '#a3a3a3',
  '--clevergy-color-border': '#d4d4d4',
  '--clevergy-module-header-title-color': 'var(--clevergy-color-text)',
  '--clevergy-module-header-action-color': '#004571',
  '--clevergy-module-container-background': 'white',
  '--clevergy-module-container-border': 'none',
  '--clevergy-module-container-border-radius': '12px',
  '--clevergy-module-container-box-shadow': '0 4px 6px -1px rgb(0 0 0 / .1), 0 2px 4px -2px rgb(0 0 0 / .1)',
  '--clevergy-module-container-padding': '16px',
  '--clevergy-module-container-margin': '16px',
  '--clevergy-button-color': 'var(--clevergy-color-primary)',
  '--clevergy-button-contrast-color': '#fff',
  '--clevergy-button-border-radius': '8px',
};

const PlatformBuilder = () => {
  const [selectedModules, setSelectedModules] = useState([]);
  const [projectType, setProjectType] = useState('web');
  const [stylesVars, setStylesVars] = useState({ ...clevergyDefaultVars });

  useEffect(() => {
    if (!stylesVars || Object.keys(stylesVars).length === 0) {
      setStylesVars({ ...clevergyDefaultVars });
    }
  }, [stylesVars]);

  const handleModuleDrop = (module) => {
    setSelectedModules(prev => [...prev, { ...module, id: Date.now() }]);
  };

  const handleModuleRemove = (moduleId) => {
    setSelectedModules(prev => prev.filter(m => m.id !== moduleId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b border-gray-200/50 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <img
                  src="/favicon%20clevergy.png"
                  alt="Clevergy logo"
                  className="w-8 h-8 rounded-lg object-cover bg-white border border-gray-200"
                />
                <h1 className="text-xl font-semibold text-gray-900">Clevergy Builder</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        <ModuleSidebar 
          onModuleDrop={handleModuleDrop}
          projectType={projectType}
          stylesVars={stylesVars}
          setStylesVars={setStylesVars}
        />
        <div className="flex-1 flex flex-col">
          {/* Aquí va el área de arrastrar módulos (puedes dejar el mensaje si no hay módulos) */}
          {/* ... podrías dejar el mensaje de BuilderCanvas si quieres ... */}
          <PreviewPanel
            modules={selectedModules}
            onModuleDrop={handleModuleDrop}
            onModuleRemove={handleModuleRemove}
            stylesVars={stylesVars}
          />
        </div>
      </div>
    </div>
  );
};

export default PlatformBuilder;
