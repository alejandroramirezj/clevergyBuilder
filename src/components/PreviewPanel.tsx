
import React from 'react';
import { ExternalLink, Smartphone, Monitor, Tablet } from 'lucide-react';
import ClervergyModules from './ClervergyModules';

const PreviewPanel = ({ modules }) => {
  const [device, setDevice] = React.useState('desktop');

  const deviceSizes = {
    desktop: 'w-full',
    tablet: 'w-[768px] mx-auto',
    mobile: 'w-[375px] mx-auto'
  };

  return (
    <div className="h-full bg-gray-100 flex flex-col">
      {/* Preview Toolbar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-semibold text-gray-900">Preview</h3>
            <span className="text-sm text-gray-500">
              {modules.length} módulos activos
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {/* Device Selector */}
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setDevice('desktop')}
                className={`p-2 rounded-md transition-colors ${
                  device === 'desktop' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                title="Desktop"
              >
                <Monitor size={16} />
              </button>
              <button
                onClick={() => setDevice('tablet')}
                className={`p-2 rounded-md transition-colors ${
                  device === 'tablet' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                title="Tablet"
              >
                <Tablet size={16} />
              </button>
              <button
                onClick={() => setDevice('mobile')}
                className={`p-2 rounded-md transition-colors ${
                  device === 'mobile' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                title="Mobile"
              >
                <Smartphone size={16} />
              </button>
            </div>

            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <ExternalLink size={16} />
              <span>Abrir en nueva ventana</span>
            </button>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className={`${deviceSizes[device]} bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300`}>
          {modules.length === 0 ? (
            <div className="h-96 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <Monitor size={48} className="mx-auto mb-4 text-gray-300" />
                <p>No hay módulos para mostrar</p>
                <p className="text-sm">Agrega módulos en el canvas para ver el preview</p>
              </div>
            </div>
          ) : (
            <div className="min-h-96">
              {modules.map((module) => (
                <div key={module.id} className="border-b border-gray-100 last:border-b-0">
                  <ClervergyModules module={module} preview={true} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Device Info */}
        <div className="mt-4 text-center text-sm text-gray-500">
          {device === 'desktop' && 'Vista desktop (1200px+)'}
          {device === 'tablet' && 'Vista tablet (768px)'}
          {device === 'mobile' && 'Vista mobile (375px)'}
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;
