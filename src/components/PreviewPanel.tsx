import React, { useState, useEffect } from 'react';
import { ExternalLink, Smartphone, Monitor, Tablet, Code, Clipboard, Trash2, Move } from 'lucide-react';
import ClervergyModules from './ClervergyModules';

// Función para generar el HTML completo
function generateFullHtml(modulesHtml) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Preview</title>
    <script type="module" src="https://assets.clever.gy/clevergy-modules.js"></script>
    <style>
      body { margin: 0; font-family: system-ui, sans-serif; background: #f8fafc; }
    </style>
  </head>
  <body>
    ${modulesHtml}
  </body>
</html>`;
}

// Recibo las variables de estilos como prop
const PreviewPanel = ({ modules, onModuleDrop, onModuleRemove, stylesVars }) => {
  const [device, setDevice] = React.useState('desktop');
  const [showCode, setShowCode] = React.useState(false);
  const [draggedOver, setDraggedOver] = useState(false);
  // Estado para feedback de copiar
  const [copied, setCopied] = useState({ style: false, html: false });

  const deviceSizes = {
    desktop: { width: '700px', height: '800px' },
    mobile: { width: '375px', height: '667px' }
  };

  const deviceOptions = [
    { key: 'desktop', label: 'Desktop', icon: <Monitor size={16} className="inline mr-1" /> },
    { key: 'mobile', label: 'Mobile', icon: <Smartphone size={16} className="inline mr-1" /> },
  ];

  // Define el estilo del contenedor de módulos (siempre igual)
  const moduleContainerStyle = {
    width: deviceSizes[device].width,
    minHeight: deviceSizes[device].height,
    background: 'transparent',
    borderRadius: 0,
    overflow: 'auto',
    boxShadow: 'none',
    padding: 0,
  };

  // Variables por defecto de Clevergy
  const clevergyDefaultVars = {
    '--clevergy-font-family': 'Verdana, Roboto, Georgia, Courier',
    '--clevergy-color-primary': '#e57200',
    '--clevergy-color-secondary': '#004571',
    '--clevergy-color-text': '#004571',
    '--clevergy-color-subtext': '#737373',
    '--clevergy-color-unselected': '#a2bdcb',
    '--clevergy-color-border': '#d9d9d9',
    '--clevergy-module-header-title-color': '#004571',
    '--clevergy-module-header-action-color': '#004571',
    '--clevergy-module-container-background': 'none',
    '--clevergy-module-container-border': 'none',
    '--clevergy-module-container-border-radius': 'none',
    '--clevergy-module-container-box-shadow': 'none',
    '--clevergy-module-container-padding': 'none',
    '--clevergy-module-container-margin': 'none',
    '--clevergy-button-color': '#e57200',
    '--clevergy-button-contrast-color': 'white',
    '--clevergy-button-border-radius': '8px',
  };

  // Genero el bloque de variables CSS dinámicamente (siempre todas las variables)
  const clevergyVarsBlock = `:root {\n${Object.entries({ ...clevergyDefaultVars, ...stylesVars }).map(([k,v]) => `  ${k}: ${v};`).join('\n')}\n}`;

  // Bloque de código mostrado: igual, pero con comentario amarillo antes del div
  const modulesHtmlForCode = `<div class="modulos-container">\n` +
    modules.map(module => module.htmlTag ? module.htmlTag : `<div>${module.name || module.id}</div>`).join('\n') +
    '\n</div>';

  const fullHtmlWithComments = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Preview</title>
    <!-- Script -->
    <script type="module" src="https://assets.clever.gy/clevergy-modules.js"></script>
    <!-- Estilos -->
    <style>
      ${clevergyVarsBlock}
    </style>
  </head>
  <body>
    <!-- Container de módulos -->
    ${modulesHtmlForCode}
  </body>
</html>`
    .replace(/(<clevergy-energy-prices[^>]*>)/g, '<!-- Módulo: Precios de energía -->\n$1')
    .replace(/(<clevergy-create-contract-opportunity[^>]*>)/g, '<!-- Módulo: Contrato -->\n$1');

  // Formatea los atributos de los módulos para que cada uno vaya en una línea separada (solo en el bloque de código mostrado)
  function formatModuleAttributes(html) {
    return html.replace(/(<(clevergy-[\w-]+))([^>]*)(>)/g, (match, start, tag, attrs, end) => {
      if (!attrs.trim()) return match;
      // Quita saltos de línea y espacios extra entre atributos
      const formattedAttrs = attrs.trim()
        .replace(/\s*\n+\s*/g, ' ')
        .replace(/\s([a-zA-Z0-9-:]+)=/g, '\n$1=');
      return `${start}\n${formattedAttrs}\n${end}`;
    });
  }

  // Aplica el formateo de atributos solo al bloque de código mostrado
  const fullHtmlWithAttrsFormatted = formatModuleAttributes(fullHtmlWithComments);

  // Resaltado profesional para todo el bloque
  const highlightedFullHtml = highlightHtmlPro(escapeHtml(fullHtmlWithAttrsFormatted));

  // Función para resaltar sintaxis suave y profesional
  function highlightHtmlPro(html) {
    return html
      .replace(/(&lt;\/?)([\w-]+)([\s\S]*?)(\/?&gt;)/g, (m, p1, p2, p3, p4) =>
        `<span style="color:#4FC3F7;">${p1}${p2}${p4}</span><span style="color:#B0BEC5;">${p3}</span>`
      )
      .replace(/([a-zA-Z0-9-:]+)(=)(&quot;.*?&quot;)/g, '<span style="color:#B0BEC5;">$1</span><span style="color:#4FC3F7;">$2</span><span style="color:#A5D6A7;">$3</span>')
      .replace(/(&lt;!--.*?--&gt;)/g, '<span style="color:#FFD54F;">$1</span>')
      .replace(/(&gt;)([^<]+)(&lt;)/g, '$1<span style="color:#ECEFF1;">$2</span>$3');
  }

  // Escapar HTML para mostrarlo como texto
  function escapeHtml(str) {
    return str.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // Handlers para copiar
  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(prev => ({ ...prev, [type]: true }));
    setTimeout(() => setCopied(prev => ({ ...prev, [type]: false })), 1200);
  };

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

  // Añadir el listener para los mensajes de los módulos
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === 'DELETE_MODULE' && event.data.moduleId) {
        onModuleRemove(event.data.moduleId);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onModuleRemove]);

  // Ajustar el ancho de la columna de código según el dispositivo
  const codeColStyle = device === 'desktop'
    ? { minWidth: 600, maxWidth: '50%' }
    : { minWidth: 0, maxWidth: '50%' };

  return (
    <div className="h-full bg-gray-100 flex flex-col">
      {/* Preview Toolbar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            {deviceOptions.map(opt => (
              <button
                key={opt.key}
                onClick={() => setDevice(opt.key)}
                className={`px-3 py-1 rounded flex items-center gap-1 ${device===opt.key ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-800'}`}
              >
                {opt.icon}
                {opt.label}
              </button>
            ))}
          </div>
          <button
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${showCode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
            onClick={() => setShowCode(v => !v)}
            title={showCode ? 'Ocultar código' : 'Ver código HTML'}
          >
            <Code size={16} />
            <span>{showCode ? 'Ocultar código' : 'Ver código'}</span>
          </button>
        </div>
      </div>

      {/* Preview Content: vista dividida solo si showCode */}
      <div 
        className={`flex-1 p-8 overflow-auto transition-all ${
          draggedOver ? 'bg-blue-50 border-2 border-dashed border-blue-300' : ''
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {modules.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-md mx-auto p-8 bg-white rounded-xl shadow-sm border-2 border-dashed border-gray-200">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center">
                <Move size={32} className="text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Arrastra módulos aquí
              </h3>
              <p className="text-gray-600">
                Selecciona módulos de Clevergy desde la barra lateral y arrástralos aquí para construir tu interfaz.
              </p>
              <div className="mt-4 text-sm text-gray-500">
                <p>• Haz clic en el botón de eliminar para quitar un módulo</p>
                <p>• Usa el botón de código para ver el HTML generado</p>
              </div>
            </div>
          </div>
        ) : showCode ? (
          <div className="flex mx-auto gap-[10px] items-start" style={{ minHeight: 400, height: 'calc(100vh - 120px)', maxWidth: 1200, width: '100%', paddingLeft: 24, paddingRight: 24, boxSizing: 'border-box' }}>
            <div style={{ ...moduleContainerStyle, height: '100%' }}>
              <style>{clevergyVarsBlock}</style>
              {modules.map((module, idx) => (
                <div key={module.id} style={{ position: 'relative', margin: 0, padding: 0, background: 'none', border: 'none' }}>
                  <button
                    onClick={() => onModuleRemove(module.id)}
                    className="absolute top-2 right-2 z-30 p-1.5 bg-white border border-gray-200 rounded-full shadow-lg transition-opacity opacity-80 hover:opacity-100 hover:bg-red-50"
                    title="Eliminar módulo"
                    style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)' }}
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                  <div dangerouslySetInnerHTML={{ __html: module.htmlTag }} />
                </div>
              ))}
            </div>
            {/* Columna de código */}
            <div className="flex-1 bg-gray-900 rounded-xl shadow overflow-auto" style={{ ...codeColStyle, height: '100%', marginRight: device === 'desktop' && showCode ? 24 : 0 }}>
              <pre className="w-full h-full rounded-lg p-4 text-xs overflow-auto shadow-lg" style={{minHeight: 200, height: '100%', background:'#181825', color:'#ECEFF1', fontFamily:'Fira Mono, monospace', fontSize:'13px', wordBreak: 'break-all', whiteSpace: 'pre-line', border: '1px solid #23272e', position: 'relative'}}>
                <code style={{display: 'block', lineHeight: 1.7}} dangerouslySetInnerHTML={{__html: highlightedFullHtml}} />
                <button
                  title="Copiar HTML generado"
                  onClick={() => handleCopy(fullHtmlWithAttrsFormatted, 'html')}
                  style={{position: 'absolute', top: 8, right: 8, background: 'none', border: 'none', cursor: 'pointer'}}>
                  <Clipboard size={16} color={copied.html ? '#A5D6A7' : '#B0BEC5'} />
                  {copied.html && <span style={{marginLeft: 6, color: '#A5D6A7', fontSize: 12}}>¡Copiado!</span>}
                </button>
              </pre>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-6 justify-center">
            <div style={moduleContainerStyle}>
              <style>{clevergyVarsBlock}</style>
              {modules.map((module, idx) => (
                <div key={module.id} style={{ position: 'relative', margin: 0, padding: 0, background: 'none', border: 'none' }}>
                  <button
                    onClick={() => onModuleRemove(module.id)}
                    className="absolute top-2 right-2 z-30 p-1.5 bg-white border border-gray-200 rounded-full shadow-lg transition-opacity opacity-80 hover:opacity-100 hover:bg-red-50"
                    title="Eliminar módulo"
                    style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)' }}
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                  <div dangerouslySetInnerHTML={{ __html: module.htmlTag }} />
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Device Info */}
        {!showCode && (
        <div className="mt-4 text-center text-sm text-gray-500">
          {device === 'desktop' && 'Vista desktop (1200px+)'}
          {device === 'mobile' && 'Vista mobile (375px)'}
        </div>
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;
