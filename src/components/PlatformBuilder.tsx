import React, { useState, useEffect } from 'react';
import ModuleSidebar from './ModuleSidebar';
import BuilderCanvas from './BuilderCanvas';
import PreviewPanel from './PreviewPanel';
import { Button } from '@/components/ui/button';
import { Play, Save, Download, Settings } from 'lucide-react';
import { ApiConsoleProvider } from './ApiConsoleContext';
import ApiConsole from './ApiConsole';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './ui/resizable';

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleModuleDrop = (module) => {
    setSelectedModules(prev => [{ ...module, id: Date.now() }, ...prev]);
  };

  const handleModuleRemove = (moduleId) => {
    setSelectedModules(prev => prev.filter(m => m.id !== moduleId));
  };

  return (
    <ApiConsoleProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex flex-col">
        {/* Header */}
        <header className="border-b border-gray-200/50 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <img
                    src={import.meta.env.BASE_URL + "favicon_clevergy.png"}
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
        <div className="flex flex-1 h-[calc(100vh-80px)] min-h-0 overflow-hidden">
          <ModuleSidebar 
            onModuleDrop={handleModuleDrop}
            projectType={projectType}
            stylesVars={stylesVars}
            setStylesVars={setStylesVars}
          />
          <div className="flex-1 flex flex-col min-h-0">
            <ResizablePanelGroup direction="vertical" className="h-full min-h-0 flex-1" style={{height: '100%'}}>
              <ResizablePanel defaultSize={75} minSize={20} maxSize={95} className="h-full min-h-0 flex-1" style={{minHeight:0, overflow:'auto'}}>
                <PreviewPanel
                  modules={selectedModules}
                  onModuleDrop={handleModuleDrop}
                  onModuleRemove={handleModuleRemove}
                  stylesVars={stylesVars}
                />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={25} minSize={10} maxSize={60} className="h-full min-h-0 flex-1" style={{minHeight:0, overflow:'auto'}}>
                <ApiConsole />
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>
      </div>
    </ApiConsoleProvider>
  );
};

export default PlatformBuilder;
