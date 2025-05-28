
import React from 'react';
import { Search, Plus, Grid3X3, Type, Image, Square as ButtonIcon, Bell, BarChart3, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';

const ModuleSidebar = ({ onModuleDrop, projectType }) => {
  const modules = [
    {
      id: 'alert',
      name: 'Alert',
      category: 'Feedback',
      icon: Bell,
      description: 'Componente de alerta configurable',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'button',
      name: 'Button',
      category: 'Inputs',
      icon: ButtonIcon,
      description: 'Botón interactivo personalizable',
      color: 'from-blue-500 to-purple-500'
    },
    {
      id: 'hero',
      name: 'Hero Section',
      category: 'Layout',
      icon: Grid3X3,
      description: 'Sección principal atractiva',
      color: 'from-green-500 to-blue-500'
    },
    {
      id: 'text',
      name: 'Typography',
      category: 'Content',
      icon: Type,
      description: 'Componente de texto dinámico',
      color: 'from-gray-500 to-gray-700'
    },
    {
      id: 'image',
      name: 'Image',
      category: 'Media',
      icon: Image,
      description: 'Componente de imagen responsive',
      color: 'from-pink-500 to-purple-500'
    },
    {
      id: 'chart',
      name: 'Chart',
      category: 'Data',
      icon: BarChart3,
      description: 'Gráfico de datos interactivo',
      color: 'from-indigo-500 to-cyan-500'
    },
    {
      id: 'energy-prices',
      name: 'Energy Prices',
      category: 'Data',
      icon: Zap,
      description: 'Precios de energía en tiempo real',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const categories = ['Todos', 'Layout', 'Inputs', 'Feedback', 'Content', 'Media', 'Data'];

  const handleDragStart = (e, module) => {
    e.dataTransfer.setData('application/json', JSON.stringify(module));
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200/50 flex flex-col">
      {/* Search */}
      <div className="p-4 border-b border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input 
            placeholder="Buscar módulos..."
            className="pl-10 bg-gray-50 border-0 focus:bg-white"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Categorías</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              className="px-3 py-1.5 text-xs rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Modules */}
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-4">
          Módulos Clevergy
          <span className="ml-2 text-xs text-gray-500">({modules.length})</span>
        </h3>
        
        <div className="space-y-3">
          {modules.map(module => {
            const Icon = module.icon;
            return (
              <div
                key={module.id}
                draggable
                onDragStart={(e) => handleDragStart(e, module)}
                className="group p-4 rounded-xl border border-gray-200 hover:border-gray-300 cursor-grab active:cursor-grabbing transition-all hover:shadow-md bg-white"
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${module.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon size={18} className="text-white" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 text-sm group-hover:text-gray-700">
                      {module.name}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {module.description}
                    </p>
                    <span className="inline-block mt-2 px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">
                      {module.category}
                    </span>
                  </div>
                  
                  <Plus size={16} className="text-gray-400 group-hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Proyecto: {projectType === 'web' ? 'Web' : 'App'}</span>
          <a 
            href="https://modules.clever.gy" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700"
          >
            Ver todos los módulos →
          </a>
        </div>
      </div>
    </div>
  );
};

export default ModuleSidebar;
