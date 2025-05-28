
import React, { useState } from 'react';
import { Trash2, Settings, Copy, Move } from 'lucide-react';
import ClervergyModules from './ClervergyModules';

const BuilderCanvas = ({ modules, onModuleRemove, onModuleDrop }) => {
  const [draggedOver, setDraggedOver] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDraggedOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDraggedOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDraggedOver(false);
    
    try {
      const moduleData = JSON.parse(e.dataTransfer.getData('application/json'));
      onModuleDrop(moduleData);
    } catch (error) {
      console.error('Error al procesar el módulo:', error);
    }
  };

  const handleModuleClick = (module) => {
    setSelectedModule(selectedModule?.id === module.id ? null : module);
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Canvas Toolbar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Canvas • {modules.length} módulos
            </span>
            {selectedModule && (
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <span>•</span>
                <span className="font-medium">{selectedModule.name}</span>
                <span>seleccionado</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Copy size={16} />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div 
        className={`flex-1 p-8 transition-all ${
          draggedOver 
            ? 'bg-blue-50 border-2 border-dashed border-blue-300' 
            : 'bg-gray-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {modules.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center">
                <Move size={32} className="text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Arrastra módulos aquí
              </h3>
              <p className="text-gray-600 max-w-md">
                Selecciona módulos de Clevergy desde la barra lateral y arrástralos aquí para construir tu interfaz.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {modules.map((module, index) => (
              <div
                key={module.id}
                onClick={() => handleModuleClick(module)}
                className={`group relative bg-white rounded-xl border-2 transition-all cursor-pointer ${
                  selectedModule?.id === module.id
                    ? 'border-blue-500 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
              >
                {/* Module Controls */}
                <div className={`absolute -top-3 right-4 flex space-x-1 transition-opacity ${
                  selectedModule?.id === module.id 
                    ? 'opacity-100' 
                    : 'opacity-0 group-hover:opacity-100'
                }`}>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      // Duplicar módulo
                    }}
                    className="p-1.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 shadow-sm"
                  >
                    <Copy size={12} />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onModuleRemove(module.id);
                    }}
                    className="p-1.5 bg-white border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-200 hover:text-red-600 shadow-sm"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>

                {/* Module Content */}
                <div className="p-6">
                  <ClervergyModules module={module} />
                </div>

                {/* Module Label */}
                <div className="absolute top-4 left-4">
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                    {module.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuilderCanvas;
