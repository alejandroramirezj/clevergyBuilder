
import React, { useState } from 'react';
import ModuleSidebar from './ModuleSidebar';
import BuilderCanvas from './BuilderCanvas';
import PreviewPanel from './PreviewPanel';
import { Button } from '@/components/ui/button';
import { Play, Save, Download, Settings } from 'lucide-react';

const PlatformBuilder = () => {
  const [selectedModules, setSelectedModules] = useState([]);
  const [previewMode, setPreviewMode] = useState(false);
  const [projectType, setProjectType] = useState('web');

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
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">C</span>
                </div>
                <h1 className="text-xl font-semibold text-gray-900">Clevergy Builder</h1>
              </div>
              
              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setProjectType('web')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    projectType === 'web' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Web
                </button>
                <button
                  onClick={() => setProjectType('app')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    projectType === 'app' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  App
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPreviewMode(!previewMode)}
                className="flex items-center space-x-2"
              >
                <Play size={16} />
                <span>{previewMode ? 'Editar' : 'Preview'}</span>
              </Button>
              
              <Button variant="outline" size="sm">
                <Save size={16} />
              </Button>
              
              <Button variant="outline" size="sm">
                <Download size={16} />
              </Button>
              
              <Button variant="outline" size="sm">
                <Settings size={16} />
              </Button>
              
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Publicar
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {!previewMode && (
          <ModuleSidebar 
            onModuleDrop={handleModuleDrop}
            projectType={projectType}
          />
        )}
        
        <div className={`flex-1 ${previewMode ? 'w-full' : ''}`}>
          {previewMode ? (
            <PreviewPanel modules={selectedModules} />
          ) : (
            <BuilderCanvas 
              modules={selectedModules}
              onModuleRemove={handleModuleRemove}
              onModuleDrop={handleModuleDrop}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PlatformBuilder;
