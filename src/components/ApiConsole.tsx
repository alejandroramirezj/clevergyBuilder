import React, { useState, useRef, useEffect } from 'react';
import { useApiConsole } from './ApiConsoleContext';
import { Clipboard, Trash2, ChevronDown, ChevronRight, GripVertical } from 'lucide-react';

const methodColors: Record<string, string> = {
  GET: '#4FC3F7',
  POST: '#A5D6A7',
  PUT: '#FFD54F',
  DELETE: '#EF9A9A',
  PATCH: '#BA68C8',
};

function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString('es-ES', { hour12: false }) + ':' + d.getMilliseconds().toString().padStart(3, '0');
}

function prettyJson(obj: unknown) {
  try {
    return JSON.stringify(obj, null, 2);
  } catch {
    return String(obj);
  }
}

const MIN_HEIGHT = 120;
const MAX_HEIGHT = 600;

const ApiConsole: React.FC = () => {
  const { logs, clearLogs } = useApiConsole();
  const [copied, setCopied] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const handleCopy = () => {
    navigator.clipboard.writeText(logs.map(log => `# ${log.comment || ''}\n${log.method} ${log.url}\nStatus: ${log.status} ${log.statusText || ''}\nHeaders: ${JSON.stringify(log.headers)}\nBody: ${prettyJson(log.body)}\nResponse: ${prettyJson(log.response)}\n---`).join('\n\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div style={{
      background: '#181825',
      color: '#ECEFF1',
      fontFamily: 'Fira Mono, monospace',
      fontSize: 13,
      borderTop: '1.5px solid #23272e',
      boxShadow: '0 -2px 8px 0 rgba(0,0,0,0.10)',
      zIndex: 20,
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      flex: 1,
      userSelect: 'none',
      position: 'relative',
    }}>
      {/* Barra superior tipo VSCode */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '0 16px', height: 36, borderBottom: '1px solid #23272e', background: '#23272e', userSelect: 'none' }}>
        <span style={{ fontWeight: 600, letterSpacing: 1, color: '#A5D6A7', fontSize: 14 }}>API Console</span>
        <span style={{ marginLeft: 12, color: '#FFD54F', fontSize: 12 }}>{logs.length} petición{logs.length === 1 ? '' : 'es'}</span>
        <div style={{ flex: 1 }} />
        <button onClick={handleCopy} style={{ background: 'none', border: 'none', color: copied ? '#A5D6A7' : '#B0BEC5', cursor: 'pointer', marginRight: 8 }} title="Copiar todo">
          <Clipboard size={16} />
          {copied && <span style={{ marginLeft: 6, color: '#A5D6A7', fontSize: 12 }}>¡Copiado!</span>}
        </button>
        <button onClick={clearLogs} style={{ background: 'none', border: 'none', color: '#EF9A9A', cursor: 'pointer' }} title="Limpiar consola">
          <Trash2 size={16} />
        </button>
      </div>
      {/* Área de logs */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0 0 0', userSelect: 'text', maxWidth: 1650, margin: '0 auto', width: '100%' }}>
        {logs.length === 0 ? (
          <div style={{ color: '#B0BEC5', textAlign: 'center', marginTop: 32 }}>No hay peticiones registradas aún.</div>
        ) : (
          logs.map(log => (
            <div key={log.id} style={{ margin: '0 0 10px 0', padding: '8px 20px', borderLeft: `3px solid ${methodColors[log.method] || '#B0BEC5'}`, background: '#20222b', borderRadius: 6, boxShadow: '0 1px 4px 0 rgba(0,0,0,0.04)', wordBreak: 'break-all', whiteSpace: 'pre-line' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: methodColors[log.method] || '#B0BEC5', fontWeight: 700 }}>{log.method}</span>
                <span style={{ color: '#FFD54F', fontSize: 12 }}>{formatTime(log.timestamp)}</span>
                <span style={{ color: '#ECEFF1', fontSize: 13, marginLeft: 8, fontWeight: 500 }}>{log.url}</span>
                <span style={{ marginLeft: 'auto', color: log.status && log.status >= 200 && log.status < 300 ? '#A5D6A7' : '#EF9A9A', fontWeight: 600, fontSize: 13 }}>{log.status} {log.statusText}</span>
              </div>
              {log.comment && <div style={{ color: '#B0BEC5', fontSize: 12, margin: '2px 0 4px 0', wordBreak: 'break-word', whiteSpace: 'pre-line' }}># {log.comment}</div>}
              {log.body && <div style={{ color: '#B0BEC5', fontSize: 12, margin: '2px 0 2px 0', wordBreak: 'break-word', whiteSpace: 'pre-line' }}>Body: <pre style={{ display: 'block', color: '#ECEFF1', wordBreak: 'break-word', whiteSpace: 'pre-line' }}>{prettyJson(log.body)}</pre></div>}
              {log.response && <div style={{ color: '#B0BEC5', fontSize: 12, margin: '2px 0 2px 0', wordBreak: 'break-word', whiteSpace: 'pre-line' }}>Resp: <pre style={{ display: 'block', color: '#ECEFF1', wordBreak: 'break-word', whiteSpace: 'pre-line' }}>{prettyJson(log.response)}</pre></div>}
              {log.headers && <div style={{ color: '#B0BEC5', fontSize: 11, margin: '2px 0 2px 0' }}>Headers: {Object.entries(log.headers).map(([k, v]) => <span key={k} style={{ color: '#FFD54F', marginRight: 8 }}>{k}: <span style={{ color: '#ECEFF1' }}>{k.toLowerCase().includes('key') ? '****' : v}</span></span>)}</div>}
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default ApiConsole; 