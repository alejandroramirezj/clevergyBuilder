import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, Plus, Zap, Trash2, Sun, Plug, Star, User, Lock, Info, Flame, Award, Paintbrush } from 'lucide-react';
import { Input } from '@/components/ui/input';
import ReactDOM from 'react-dom';
import { useApiConsole } from './ApiConsoleContext';
import HouseStatusIcons from './HouseStatusIcons';
import { House, HouseDetail } from '@/types/house';
import confetti from 'canvas-confetti';
import {
  Tooltip as ShadTooltip,
  TooltipContent as ShadTooltipContent,
  TooltipProvider as ShadTooltipProvider,
  TooltipTrigger as ShadTooltipTrigger,
} from "@/components/ui/tooltip";

// Justo al inicio del archivo, después de los imports
declare global {
  interface Window {
    completeOnboardingVisualizeStep?: () => void;
    welcomeSteps?: { dragModule: boolean; customize: boolean; visualize: boolean };
  }
}

// Estado para estilos globales
const defaultStyles = {
  '--clevergy-app-background': '#f5f5f5',
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

// Valores por defecto para cada variable
const defaultPlaceholders = {
  '--clevergy-app-background': '#f5f5f5',
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

// Tooltip helper
const Tooltip = ({ text }) => {
  const ref = React.useRef(null);
  const [show, setShow] = React.useState(false);
  const [coords, setCoords] = React.useState({ top: 0, left: 0, width: 0 });

  React.useEffect(() => {
    if (show && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setCoords({ top: rect.bottom + 8, left: rect.left + rect.width / 2, width: rect.width });
    }
  }, [show]);

  return (
    <>
      <span
        ref={ref}
        className="relative ml-1"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        tabIndex={0}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        style={{ display: 'inline-flex', alignItems: 'center' }}
      >
        <Info size={14} className="text-gray-400 cursor-pointer" />
      </span>
      {show && ReactDOM.createPortal(
        <div
          style={{
            position: 'fixed',
            top: coords.top,
            left: coords.left,
            transform: 'translateX(-50%)',
            zIndex: 9999,
            pointerEvents: 'none',
          }}
        >
          <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-xl transition-opacity duration-200 max-w-xs whitespace-pre-line relative">
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-900 rotate-45 rounded-sm shadow-xl" style={{ zIndex: 1 }} />
            {text}
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

// Hook para buscar Google Fonts
const useGoogleFonts = (query) => {
  const [fonts, setFonts] = useState([]);
  useEffect(() => {
    if (!query) return setFonts([]);
    fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyA-EXAMPLE-KEY&sort=popularity`)
      .then(res => res.json())
      .then(data => {
        setFonts(data.items.filter(f => f.family.toLowerCase().includes(query.toLowerCase())));
      });
  }, [query]);
  return fonts;
};

const getInitialStylesVars = () => {
  const saved = localStorage.getItem('clevergy-custom-styles');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return { ...defaultStyles };
    }
  }
  return { ...defaultStyles };
};

// Paletas por defecto
const clevergyPalette = {
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
const octopusPalette = {
  '--clevergy-font-family': 'Inter, system-ui, sans-serif',
  '--clevergy-color-primary': '#ce2093', // rosa fuerte
  '--clevergy-color-secondary': '#fdbb58', // amarillo
  '--clevergy-color-text': '#4a0a70', // morado oscuro
  '--clevergy-color-subtext': '#e6caf7', // lila claro
  '--clevergy-color-unselected': '#a3a3a3',
  '--clevergy-color-border': '#ce2093',
  '--clevergy-module-header-title-color': '#4a0a70',
  '--clevergy-module-header-action-color': '#ce2093',
  '--clevergy-module-container-background': 'white',
  '--clevergy-module-container-border': 'none',
  '--clevergy-module-container-border-radius': '12px',
  '--clevergy-module-container-box-shadow': '0 4px 6px -1px rgb(0 0 0 / .1), 0 2px 4px -2px rgb(0 0 0 / .1)',
  '--clevergy-module-container-padding': '16px',
  '--clevergy-module-container-margin': '16px',
  '--clevergy-button-color': '#ce2093',
  '--clevergy-button-contrast-color': '#fff',
  '--clevergy-button-border-radius': '8px',
};
const naturgyPalette = {
  '--clevergy-font-family': 'Inter, system-ui, sans-serif',
  '--clevergy-color-primary': '#ff8200', // naranja naturgy
  '--clevergy-color-secondary': '#005493', // azul naturgy
  '--clevergy-color-text': '#005493',
  '--clevergy-color-subtext': '#737373',
  '--clevergy-color-unselected': '#a3a3a3',
  '--clevergy-color-border': '#ff8200',
  '--clevergy-module-header-title-color': '#005493',
  '--clevergy-module-header-action-color': '#ff8200',
  '--clevergy-module-container-background': 'white',
  '--clevergy-module-container-border': 'none',
  '--clevergy-module-container-border-radius': '12px',
  '--clevergy-module-container-box-shadow': '0 4px 6px -1px rgb(0 0 0 / .1), 0 2px 4px -2px rgb(0 0 0 / .1)',
  '--clevergy-module-container-padding': '16px',
  '--clevergy-module-container-margin': '16px',
  '--clevergy-button-color': '#ff8200',
  '--clevergy-button-contrast-color': '#fff',
  '--clevergy-button-border-radius': '8px',
};
const defaultSavedStyles = [
  { name: 'Clevergy', vars: clevergyPalette },
  { name: 'Cangrejo Rosa', vars: octopusPalette },
  { name: 'Gas Naranja', vars: naturgyPalette },
];

// Lista de emojis para estilos personalizados
const EMOJIS = ["🦄", "🌈", "🚀", "✨", "🎨", "🔥", "🌟", "🍀", "🧩", "🎉", "🦋", "🧸", "🪐", "🌻", "🍉", "🦕", "🦩", "🦚", "🦜", "🦔", "🦦", "🦥", "🦭", "🦨", "🦡", "🦢", "🦩", "🦚", "🦜", "🦔", "🦦", "🦥", "🦭", "🦨", "🦡", "🦢"];
function getRandomEmoji() {
  return EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
}

// SVG de círculo progresivo para el stepper
const StepCircle = ({ status }: { status: 'pending' | 'inprogress' | 'done' }) => {
  let color = '#d1d5db'; // gris
  let percent = 0;
  let fill = 'white';
  let iColor = 'transparent';
  let iFontWeight = 'normal';
  let iFontSize = 13;
  if (status === 'inprogress') {
    color = '#3b82f6'; // azul
    percent = 50;
  }
  if (status === 'done') {
    color = '#22c55e'; // verde
    percent = 100;
    fill = 'white';
    iColor = '#22c55e';
    iFontWeight = 'normal';
    iFontSize = 13;
  }
  const radius = 12;
  const stroke = 3;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percent / 100) * circumference;
  return (
    <svg height={radius * 2} width={radius * 2} style={{ position: 'relative', display: 'block' }}>
      <circle
        stroke="#e5e7eb"
        fill="white"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke={color}
        fill={fill}
        strokeWidth={stroke}
        strokeDasharray={circumference + ' ' + circumference}
        style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.4s, stroke 0.4s' }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      {status === 'done' && (
        <text
          x={radius}
          y={radius + 4}
          textAnchor="middle"
          fontSize={iFontSize}
          fontWeight={iFontWeight}
          fill={iColor}
          pointerEvents="none"
        >
          i
        </text>
      )}
    </svg>
  );
};

// Utilidad para badge de método
const MethodBadge = ({ method = 'GET' }) => (
  <span className="inline-block bg-teal-200 text-teal-800 text-xs font-bold rounded px-2 py-0.5 mr-2 align-middle">{method}</span>
);

const ModuleSidebar = ({ onModuleDrop, projectType, stylesVars, setStylesVars }) => {
  const [houseId, setHouseId] = useState("");
  const [token, setToken] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [userId, setUserId] = useState("");
  const [authFilter, setAuthFilter] = useState({ auth: true, noauth: true });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const allCategories = [
    "Energía",
    "Solar",
    "Integraciones",
    "Leads",
    "Comercializadora"
  ];
  const [categoryFilter, setCategoryFilter] = useState(allCategories);
  const [search, setSearch] = useState("");
  const [customAttrs, setCustomAttrs] = useState({});
  const [showStyles, setShowStyles] = useState(false);
  const [activeTab, setActiveTab] = useState('Colores');
  const [fontQuery, setFontQuery] = useState('');
  const googleFonts = useGoogleFonts(fontQuery);
  const [feedback, setFeedback] = useState('');
  const [savedStyles, setSavedStyles] = useState(() => {
    try {
      let local = JSON.parse(localStorage.getItem('clevergy-saved-styles') || 'null');
      if (local && Array.isArray(local)) {
        local = local.map(s => s.name === 'Estilo Clevergy' ? { ...s, name: 'Clevergy' } : s);
        localStorage.setItem('clevergy-saved-styles', JSON.stringify(local));
        if (local.length > 0) return local;
      }
      localStorage.setItem('clevergy-saved-styles', JSON.stringify(defaultSavedStyles));
      return defaultSavedStyles;
    } catch {
      localStorage.setItem('clevergy-saved-styles', JSON.stringify(defaultSavedStyles));
      return defaultSavedStyles;
    }
  });
  const [styleName, setStyleName] = useState('');
  const [showAddStyle, setShowAddStyle] = useState(false);
  // Estado para el dropdown de estilos de ejemplo
  const [showExamples, setShowExamples] = useState(true);
  // Estado global para controlar qué categorías están abiertas
  const [openCategories, setOpenCategories] = useState(() => {
    const initial = {};
    allCategories.forEach((cat) => { initial[cat] = false; }); // Todas colapsadas por defecto
    return initial;
  });
  const [email, setEmail] = useState("");
  const [houses, setHouses] = useState<House[]>([]);
  const [selectedHouseId, setSelectedHouseId] = useState("");
  const { logApiCall, logs } = useApiConsole();
  // Estado para los dropdowns abiertos/cerrados
  const [authDropdownOpen, setAuthDropdownOpen] = useState(false); // cerrado por defecto
  const [privadosDropdownOpen, setPrivadosDropdownOpen] = useState(false); // cerrado por defecto
  const [emoji, setEmoji] = useState("");
  // Estado para mostrar el input de edición de emoji
  const [editingEmoji, setEditingEmoji] = useState(false);
  const [houseDetails, setHouseDetails] = useState<Record<string, HouseDetail>>({});
  const [showWelcome, setShowWelcome] = useState(() => {
    // Persistencia en localStorage para no mostrarlo siempre
    try {
      return localStorage.getItem('clevergy-hide-welcome') !== '1';
    } catch {
      return true;
    }
  });
  // Estado para el stepper de bienvenida
  const [welcomeSteps, setWelcomeSteps] = useState({
    dragModule: false,
    customize: false,
    visualize: false
  });

  // Ejemplo de definición de módulos con categoría
  const allModules = [
    {
      id: 'energy-prices',
      name: 'Precios de la energía',
      description: 'Precios de energía en tiempo real',
      auth: false,
      category: 'Energía',
      htmlTag: '<clevergy-energy-prices\n    data-energy-prices-type="PVPC"\n    data-language="es"\n    data-show-energy-price-list="true"\n    data-show-energy-price-surplus="false"\n  />'
    },
    {
      id: 'contract',
      name: 'Generar un contrato',
      icon: Zap,
      description: 'Oportunidad de contrato Clevergy',
      auth: false,
      category: 'Leads',
      htmlTag: '<clevergy-create-contract-opportunity data-client-key="fba8a790ff474b69696271680851d0d529c3" data-language="es-ES"></clevergy-create-contract-opportunity>'
    },
    {
      id: 'integration-shelly',
      name: 'Integración Shelly',
      icon: Zap,
      description: 'Integración con dispositivos Shelly',
      auth: true,
      category: 'Integraciones',
      htmlTag: `<clevergy-integration-shelly data-token="${token}" data-house-id="${houseId}" data-language="es-ES"></clevergy-integration-shelly>`
    },
    {
      id: 'smart-devices',
      name: 'Dispositivos inteligentes',
      icon: Zap,
      description: 'Gestión de dispositivos inteligentes',
      auth: true,
      category: 'Integraciones',
      htmlTag: `<clevergy-smart-devices data-token="${token}" data-house-id="${houseId}" data-language="es-ES"></clevergy-smart-devices>`
    },
    {
      id: 'smart-devices-settings',
      name: 'Ajustes de dispositivos inteligentes',
      icon: Zap,
      description: 'Configuración de dispositivos inteligentes',
      auth: true,
      category: 'Integraciones',
      htmlTag: `<clevergy-smart-devices-settings data-token="${token}" data-house-id="${houseId}" data-show-back-button="false" data-show-add-devices-button="false" data-language="es-ES"></clevergy-smart-devices-settings>`
    },
    {
      id: 'alerts-settings',
      name: 'Ajustes de avisos',
      icon: Zap,
      description: 'Configura tus avisos',
      auth: true,
      category: 'Energía',
      htmlTag: `<clevergy-alerts-settings
        data-token="${token}"
        data-house-id="${houseId}"
        data-title="Configura tus avisos"
        data-unit="ENERGY"
        data-language="es-ES"
      />`
    },
    {
      id: 'battery',
      name: 'Batería',
      icon: Zap,
      description: 'Batería',
      auth: true,
      category: 'Energía',
      htmlTag: `<clevergy-battery
        data-token="${token}"
        data-house-id="${houseId}"
        data-cups=""
        data-language="es-ES"
      />`
    },
    {
      id: 'breakdown',
      name: 'Desglose de consumo',
      icon: Zap,
      description: 'Desglose de consumo',
      auth: true,
      category: 'Energía',
      htmlTag: `<clevergy-breakdown
        data-token="${token}"
        data-house-id="${houseId}"
        data-show-dates-selector="true"
        data-date-range-type=""
        data-custom-start-date=""
        data-custom-end-date=""
        data-unit="ENERGY"
        data-language="es-ES"
      />`
    },
    {
      id: 'consumption-cumulative',
      name: 'Consumo acumulado',
      icon: Zap,
      description: 'Consumo acumulado',
      auth: true,
      category: 'Energía',
      htmlTag: `<clevergy-consumption-cumulative
        data-token="${token}"
        data-house-id="${houseId}"
        data-tooltip="This is a tooltip"
        data-unit="ENERGY"
        data-language="es-ES"
      />`
    },
    {
      id: 'energy-chart',
      name: 'Gráfico de energía',
      icon: Zap,
      description: 'Gráfico de energía',
      auth: true,
      category: 'Energía',
      htmlTag: `<clevergy-energy-chart
        data-token="${token}"
        data-house-id="${houseId}"
        data-show-dates-selector="true"
        data-date-range-type="month"
        data-date-range-current-date="2024-03-01"
        data-custom-start-date=""
        data-custom-end-date=""
        data-language="es-ES"
        data-show-download-csv="true"
        data-unit="ENERGY"
      />`
    },
    {
      id: 'house-comparison',
      name: 'Comparativa de hogares',
      icon: Zap,
      description: 'Comparativa de hogares',
      auth: true,
      category: 'Energía',
      htmlTag: `<clevergy-house-comparison
        data-token="${token}"
        data-house-id="${houseId}"
        data-view="race"
        data-show-dates-selector="false"
        data-dates-selector-position-="bottom"
        data-variant="advanced"
        data-tooltip="<p><strong>En esta sección puedes comparar el consumo de tu hogar con:</strong></p><ul><li><strong>Hogares cercanos:</strong> consumo medio de hogares con el mismo código postal que tú.</li><li><strong>Hogares similares:</strong> consumo medio de hogares con características similares según tu configuración de la cuenta.</li><li><strong>Hogares eficientes:</strong> consumo medio de hogares con características similares según tu configuración de la cuenta, teniendo en cuenta solo el 30% de los hogares con menor consumo.</li></ul>"
        data-language="es-ES"
      />`
    },
    {
      id: 'house-contract',
      name: 'Contrato del hogar',
      icon: Zap,
      description: 'Contrato del hogar',
      auth: true,
      category: 'Comercializadora',
      htmlTag: `<clevergy-house-contract
        data-token="${token}"
        data-house-id="${houseId}"
        data-language="es-ES"
      />`
    },
    {
      id: 'house-settings',
      name: 'Configuración del hogar',
      icon: Zap,
      description: 'Configuración del hogar',
      auth: true,
      category: 'Energía',
      htmlTag: `<clevergy-house-settings
        data-token="${token}"
        data-house-id="${houseId}"
        data-language="es-ES"
      />`
    },
    {
      id: 'integration-fronius-b2c',
      name: 'Integración Fronius B2C',
      icon: Zap,
      description: 'Integración Fronius B2C',
      auth: true,
      category: 'Integraciones',
      htmlTag: `<clevergy-integration-fronius-b2c
        data-token="${token}"
        data-house-id="${houseId}"
        data-allow-skipping="false"
        data-language="es-ES"
      />`
    },
    {
      id: 'integration-huawei-b2c',
      name: 'Integración Huawei B2C',
      icon: Zap,
      description: 'Integración Huawei B2C',
      auth: true,
      category: 'Integraciones',
      htmlTag: `<clevergy-integration-huawei-b2c
        data-token="${token}"
        data-house-id="${houseId}"
        data-callback-url=""
        data-delegate-url-opening=""
        data-allow-skipping=""
        data-language="es-ES"
      />`
    },
    {
      id: 'invoice-viewer',
      name: 'Visor de facturas',
      icon: Zap,
      description: 'Visor de facturas',
      auth: true,
      category: 'Comercializadora',
      htmlTag: `<clevergy-invoice-viewer
        data-token="${token}"
        data-house-id="${houseId}"
        data-title="Factura explicada"
        data-language="es-ES"
        data-show-empty-state="false"
      />`
    },
    {
      id: 'power-chart',
      name: 'Gráfico de potencia',
      icon: Zap,
      description: 'Gráfico de potencia',
      auth: true,
      category: 'Solar',
      htmlTag: `<clevergy-power-chart
        data-token="${token}"
        data-house-id="${houseId}"
        data-current-date="2024-03-01"
        data-language="es-ES"
      />`
    },
    {
      id: 'rate-recommender',
      name: 'Recomendador de tarifa',
      icon: Zap,
      description: 'Recomendador de tarifa',
      auth: true,
      category: 'Leads',
      htmlTag: `<clevergy-rate-recommender
        data-token="${token}"
        data-house-id="${houseId}"
        data-variant="default"
        data-language="es-ES"
      />`
    },
    {
      id: 'recommendations',
      name: 'Recomendaciones',
      icon: Zap,
      description: 'Recomendaciones',
      auth: true,
      category: 'Leads',
      htmlTag: `<clevergy-recommendations
        data-token="${token}"
        data-house-id="${houseId}"
        data-title="Recomendaciones"
        data-language="es-ES"
      />`
    },
    {
      id: 'solar-amortization',
      name: 'Amortización solar',
      icon: Zap,
      description: 'Amortización solar',
      auth: true,
      category: 'Solar',
      htmlTag: `<clevergy-solar-amortization
        data-token="${token}"
        data-house-id="${houseId}"
        data-language="es-ES"
      />`
    },
    {
      id: 'solar-info',
      name: 'Información solar',
      icon: Zap,
      description: 'Información solar',
      auth: true,
      category: 'Solar',
      htmlTag: `<clevergy-solar-info
        data-token="${token}"
        data-house-id="${houseId}"
        data-language="es-ES"
      />`
    },
    {
      id: 'solar-real-time',
      name: 'Solar en tiempo real',
      icon: Zap,
      description: 'Solar en tiempo real',
      auth: true,
      category: 'Solar',
      htmlTag: `<clevergy-solar-real-time
        data-token="${token}"
        data-house-id="${houseId}"
        data-language="es-ES"
      />`
    },
    {
      id: 'solar-recommender',
      name: 'Recomendador solar',
      icon: Zap,
      description: 'Recomendador solar',
      auth: true,
      category: 'Leads',
      htmlTag: `<clevergy-solar-recommender
        data-token="${token}"
        data-house-id="${houseId}"
        data-language="es-ES"
      />`
    },
    {
      id: 'solar-summary',
      name: 'Resumen solar',
      icon: Zap,
      description: 'Resumen solar',
      auth: true,
      category: 'Solar',
      htmlTag: `<clevergy-solar-summary
        data-token="${token}"
        data-house-id="${houseId}"
        data-show-dates-selector="true"
        data-title="Resumen"
        data-unit="ENERGY"
        data-language="es-ES"
      />`
    },
    {
      id: 'tips-panel',
      name: 'Panel de consejos',
      icon: Zap,
      description: 'Panel de consejos',
      auth: true,
      category: 'Energía',
      htmlTag: `<clevergy-tips-panel
        data-token="${token}"
        data-house-id="${houseId}"
        data-language="es-ES"
      />`
    },
    {
      id: 'virtual-wallet',
      name: 'Monedero virtual',
      icon: Zap,
      description: 'Monedero virtual',
      auth: true,
      category: 'Comercializadora',
      htmlTag: `<clevergy-virtual-wallet
        data-token="${token}"
        data-house-id="${houseId}"
        data-language="es-ES"
      />`
    }
  ];

  // Agrupa los módulos por categoría
  const groupedModules = allModules.reduce((acc, mod) => {
    acc[mod.category] = acc[mod.category] || [];
    acc[mod.category].push(mod);
    return acc;
  }, {});

  // Filtrado según autenticación y categoría
  const modules = useMemo(() => {
    return allModules.filter(m =>
      ((m.auth && authFilter.auth) || (!m.auth && authFilter.noauth)) &&
      (categoryFilter.includes(m.category)) &&
      (
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.description.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [authFilter, houseId, token, categoryFilter, search]);

  // Helper para extraer atributos de la string htmlTag
  function extractAttrs(htmlTag) {
    const attrs = {};
    const attrRegex = /([a-zA-Z0-9-:]+)="([^"]*)"/g;
    let match;
    while ((match = attrRegex.exec(htmlTag))) {
      if (match[1] !== 'data-house-id' && match[1] !== 'data-token') {
        attrs[match[1]] = match[2];
      }
    }
    return attrs;
  }

  // Helper para insertar comentarios ANTES de la etiqueta, nunca dentro de los atributos
  function addCommentsToHtmlTag(htmlTag, houseId, token) {
    return htmlTag;
  }

  // Función para actualizar el estado del stepper
  const updateWelcomeStep = (step) => {
    setWelcomeSteps(prev => ({
      ...prev,
      [step]: true
    }));
  };

  // Modificar handleDragStart para actualizar el primer paso
  const handleDragStart = (e, module) => {
    let htmlTag = module.htmlTag;
    const attrs = extractAttrs(htmlTag);
    const custom = customAttrs[module.id] || {};
    Object.entries(attrs).forEach(([attr, val]) => {
      if (custom[attr] !== undefined) {
        htmlTag = htmlTag.replace(
          new RegExp(`${attr}="[^"]*"`),
          `${attr}="${custom[attr]}"`
        );
      }
    });
    htmlTag = addCommentsToHtmlTag(htmlTag, houseId, token);
    const moduleWithCustom = { ...module, htmlTag };
    e.dataTransfer.setData('application/json', JSON.stringify(moduleWithCustom));
    e.dataTransfer.effectAllowed = 'move';
    
    // Si es el módulo de precios de energía, lanzar confeti SOLO si el paso no está completado
    if (module.id === 'energy-prices' && !welcomeSteps.dragModule) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      updateWelcomeStep('dragModule');
    } else if (module.id === 'energy-prices') {
      updateWelcomeStep('dragModule');
    }
  };

  const categoryInfo = {
    "Energía": { icon: <Zap size={18} />, iconBg: "bg-yellow-100", border: "border-yellow-300", chip: "focus:ring-yellow-300" },
    "Solar": { icon: <Sun size={18} />, iconBg: "bg-orange-100", border: "border-orange-300", chip: "focus:ring-orange-300" },
    "Integraciones": { icon: <Plug size={18} />, iconBg: "bg-gray-200", border: "border-gray-300", chip: "focus:ring-gray-300" },
    "Leads": { icon: <Star size={18} />, iconBg: "bg-blue-100", border: "border-blue-300", chip: "focus:ring-blue-300" },
    "Comercializadora": { icon: <User size={18} />, iconBg: "bg-green-100", border: "border-green-300", chip: "focus:ring-green-300" }
  };

  // Inyectar estilos en el documento principal
  React.useEffect(() => {
    let styleTag = document.getElementById('clevergy-custom-vars');
      if (!styleTag) {
      styleTag = document.createElement('style');
        styleTag.id = 'clevergy-custom-vars';
      document.head.appendChild(styleTag);
      }
      styleTag.innerHTML = `:root {\n${Object.entries(stylesVars).map(([k,v]) => `  ${k}: ${v};`).join('\n')}\n}`;
  }, [stylesVars]);

  // Helper para limpiar los valores por defecto para los campos numéricos (ahora con px y los nuevos valores)
  const getDefaultStylesClean = () => {
    return { ...defaultStyles };
  };

  // Función para guardar un nuevo estilo con nombre
  const handleSaveStyle = () => {
    if (!styleName.trim()) {
      setFeedback('Ponle un nombre a tu estilo');
      setTimeout(() => setFeedback(''), 1200);
      return;
    }
    let newEmoji = emoji;
    // Si es un estilo nuevo y no tiene emoji, asignar uno aleatorio
    const existing = savedStyles.find(s => s.name === styleName.trim());
    if (!existing && !emoji) {
      newEmoji = getRandomEmoji();
      setEmoji(newEmoji);
    } else if (existing && !emoji && existing.emoji) {
      newEmoji = existing.emoji;
      setEmoji(newEmoji);
    }
    const newStyles = [
      ...savedStyles.filter(s => s.name !== styleName.trim()),
      { name: styleName.trim(), vars: { ...stylesVars }, emoji: newEmoji }
    ];
    setSavedStyles(newStyles);
    localStorage.setItem('clevergy-saved-styles', JSON.stringify(newStyles));
    setFeedback('¡Estilo guardado!');
    setTimeout(() => setFeedback(''), 1200);
  };

  // Modificar handleLoadStyle para actualizar el segundo paso
  const handleLoadStyle = (vars, emoji) => {
    setStylesVars(vars);
    setStyleName('');
    setEmoji(emoji || getRandomEmoji());
    setShowStyles(false);
    setFeedback('¡Estilo cargado!');
    setTimeout(() => setFeedback(''), 1200);
    
    // Lanzar confeti al cambiar el tema y actualizar el paso
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    updateWelcomeStep('customize');
  };

  // Función para eliminar un estilo guardado
  const handleDeleteStyle = (name) => {
    const newStyles = savedStyles.filter(s => s.name !== name);
    setSavedStyles(newStyles);
    localStorage.setItem('clevergy-saved-styles', JSON.stringify(newStyles));
    setFeedback('Estilo eliminado');
    setTimeout(() => setFeedback(''), 1200);
  };

  // Calcular el total de módulos privados
  const totalPrivateModules = Object.values(groupedModules).reduce((acc: number, mods) => {
    if (Array.isArray(mods)) {
      return acc + (mods as {auth: boolean}[]).filter(m => m.auth).length;
    }
    return acc;
  }, 0);

  // Helper para loggear peticiones
  const loggedFetch = async (url, options, comment) => {
    const start = Date.now();
    let status, statusText, responseData;
    try {
      const res = await fetch(url, options);
      status = res.status;
      statusText = res.statusText;
      let data;
      try {
        data = await res.clone().json();
      } catch {
        data = await res.clone().text();
      }
      responseData = data;
      logApiCall({
        method: options?.method || 'GET',
        url,
        status,
        statusText,
        headers: options?.headers,
        body: options?.body,
        response: data,
        time: Date.now() - start,
        comment,
      });
      return res;
    } catch (err) {
      logApiCall({
        method: options?.method || 'GET',
        url,
        status,
        statusText,
        headers: options?.headers,
        body: options?.body,
        response: responseData || String(err),
        time: Date.now() - start,
        comment: comment + ' (error)',
      });
      throw err;
    }
  };

  const fetchHouseDetails = async (houseId: string) => {
    try {
      const detailUrl = `https://connect.clever.gy/houses/${houseId}/house-detail`;
      const detailResp = await loggedFetch(detailUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'clevergy-api-key': apiKey
        }
      }, `🏠 Obteniendo detalles de la casa ${houseId}`);
      
      if (!detailResp.ok) {
        console.error('Error al obtener detalles de la casa:', await detailResp.text());
        return;
      }

      const detailData = await detailResp.json() as HouseDetail;
      setHouseDetails(prev => ({
        ...prev,
        [houseId]: detailData
      }));

      // Imprimir en consola con el formato solicitado
      console.log({
        details: {
          houseId: detailData.details?.houseId,
          cups: detailData.details?.cups || null,
          address: detailData.details?.address || null,
        },
        houseMetadata: {
          firstDateEnergy: detailData.houseMetadata?.firstDateEnergy || null,
          firstDatePower: detailData.houseMetadata?.firstDatePower || null,
          firstDateCost: detailData.houseMetadata?.firstDateCost || null,
          isOwner: detailData.houseMetadata?.isOwner || false
        },
        houseIntegrations: {
          huaweiB2C: {
            status: detailData.houseIntegrations?.huaweiB2C?.status || "NONE"
          },
          froniusB2C: {
            status: detailData.houseIntegrations?.froniusB2C?.status || "NONE"
          }
        }
      });
      // Comentarios explicativos de cada campo
      console.info('Explicación de los campos:');
      console.info('details.houseId: ID único de la casa.');
      console.info('details.cups: Código CUPS del suministro.');
      console.info('details.address: Dirección de la casa.');
      console.info('houseMetadata.firstDateEnergy: Fecha del primer dato de consumo. Si tiene valor, icono de rayo encendido ⚡');
      console.info('houseMetadata.firstDatePower: Fecha del primer dato de producción. Si tiene valor, icono de sol encendido ☀️');
      console.info('houseMetadata.firstDateCost: Fecha del primer dato de euros. Si tiene valor, icono de euro encendido €');
      console.info('houseMetadata.isOwner: Si el usuario es propietario.');
      console.info('houseIntegrations.huaweiB2C.status: Estado de integración Huawei. Si es ACTIVE/CONNECTED, icono enchufe encendido.');
      console.info('houseIntegrations.froniusB2C.status: Estado de integración Fronius. Si es ACTIVE/CONNECTED, icono enchufe encendido.');
    } catch (err) {
      console.error('Error al obtener detalles de la casa:', err);
    }
  };

  // Modificar fetchToken para obtener detalles de todas las casas
  const fetchToken = async () => {
    if (!apiKey || !email) {
      setError("Por favor, ingresa el API key y el email");
      return;
    }

    setIsLoading(true);
    setError("");
    setHouses([]);
    setSelectedHouseId("");
    setToken("");
    setUserId("");

    try {
      // 1. Buscar el userId a partir del email
      const userUrl = `https://connect.clever.gy/users?size=1&sort=id&direction=ASC&email=${encodeURIComponent(email)}`;
      const userResp = await loggedFetch(userUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'clevergy-api-key': apiKey
        }
      }, '🔍 Paso 1/3: Buscando usuario por email para obtener su ID');
      const userData = await userResp.json();
      if (!userResp.ok || !userData.elements || userData.totalElements < 1) {
        setError('No se encontró ningún usuario con ese email.');
        setIsLoading(false);
        return;
      }
      const foundUserId = userData.elements[0].id;
      setUserId(foundUserId);

      // 2. Obtener el token del usuario
      const tokenUrl = `https://connect.clever.gy/auth/${foundUserId}/token`;
      const tokenResp = await loggedFetch(tokenUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'clevergy-api-key': apiKey
        }
      }, '🔑 Paso 2/3: Obteniendo token JWT para impersonar al usuario');
      const tokenData = await tokenResp.json();
      if (tokenResp.ok && tokenData.jwt) {
        setToken(tokenData.jwt);
        setError("");
        logApiCall({
          method: 'INFO',
          url: 'Token obtenido',
          comment: '✅ Token JWT obtenido correctamente. Este token tiene una validez de 1 hora y permite acceder a los datos del usuario y sus suministros.',
        });
      } else {
        setError('No se pudo obtener el token del usuario.');
        setToken("");
        setIsLoading(false);
        return;
      }

      // 3. Buscar las casas del usuario
      const housesUrl = `https://connect.clever.gy/users/${foundUserId}/supplies`;
      const housesResp = await loggedFetch(housesUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'clevergy-api-key': apiKey
        }
      }, '🏠 Paso 3/3: Obteniendo las casas asociadas al usuario');
      const housesData = await housesResp.json();
      if (!housesResp.ok) {
        setError('No se pudieron obtener las casas del usuario.');
        setIsLoading(false);
        return;
      }
      if (Array.isArray(housesData)) {
        setHouses(housesData);
        // Obtener detalles de todas las casas
        for (const house of housesData) {
          await fetchHouseDetails(house.houseId);
        }
      } else if (housesData.elements) {
        setHouses(housesData.elements);
        // Obtener detalles de todas las casas
        for (const house of housesData.elements) {
          await fetchHouseDetails(house.houseId);
        }
      } else {
        setError('No se encontraron casas para este usuario.');
        setIsLoading(false);
        return;
      }
      setError('');
      setIsLoading(false);
    } catch (err) {
      setError('Error en la petición: ' + (err.message || err));
      setToken("");
      setIsLoading(false);
    }
  };

  const handleSelectHouseAndGetToken = async (houseId) => {
    setSelectedHouseId(houseId);
    setHouseId(houseId);
    // Ya no se pide el token aquí, porque ya se obtuvo antes
  };

  // Detectar pasos completados
  let userIdStep = { status: 'pending', userId: null, logId: null };
  let housesStep = { status: 'pending', userId: null, logId: null };
  let houseDetailsStep = { status: 'pending', houseId: null, logId: null };

  // Paso 1: Buscar userId
  const userLog = logs.find(log => log.method === 'GET' && log.url.includes('/users?'));
  if (userLog) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const resp = userLog.response as any;
    if (resp && resp.elements && resp.elements[0]?.id) {
      userIdStep = { status: 'done', userId: resp.elements[0].id, logId: `api-get-userid-${resp.elements[0].id}` };
    } else {
      userIdStep = { status: 'inprogress', userId: null, logId: null };
    }
  }

  // Paso 2: Obtener casas
  const housesLog = logs.find(log => log.method === 'GET' && /\/users\/.+\/supplies/.test(log.url));
  if (housesLog) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const resp = housesLog.response as any;
    if ((Array.isArray(resp) && resp.length > 0) || (resp && resp.elements)) {
      const uid = housesLog.url.match(/\/users\/([\w-]+)\/supplies/);
      housesStep = { status: 'done', userId: uid ? uid[1] : null, logId: uid ? `api-get-houses-${uid[1]}` : null };
    } else {
      housesStep = { status: 'inprogress', userId: null, logId: null };
    }
  }

  // Paso 3: Obtener detalles de la casa
  const selectedHouseIdForStep = selectedHouseId;
  const houseDetailsLog = logs.find(log => log.method === 'GET' && /\/houses\/.+\/house-detail/.test(log.url) && log.url.includes(selectedHouseIdForStep));
  if (houseDetailsLog && houseDetailsLog.status && houseDetailsLog.status >= 200 && houseDetailsLog.status < 300) {
    houseDetailsStep = { status: 'done', houseId: selectedHouseIdForStep, logId: `api-get-house-details-${selectedHouseIdForStep}` };
  } else if (houseDetailsLog) {
    houseDetailsStep = { status: 'inprogress', houseId: selectedHouseIdForStep, logId: null };
  }

  // Render del stepper
  const steps = [
    {
      label: 'Buscar userId',
      status: userIdStep.status,
      logId: userIdStep.logId,
      tooltip: (
        <div>
          <div className="font-semibold mb-1">Buscar userId</div>
          <div>Petición GET para buscar el usuario por email.</div>
          {userIdStep.logId && (
            <button
              className="mt-2 underline text-blue-600 text-xs"
              onClick={() => scrollToStep(userIdStep.logId)}
            >Ir a la petición en la consola</button>
          )}
        </div>
      ),
    },
    {
      label: 'Obtener casas',
      status: housesStep.status,
      logId: housesStep.logId,
      tooltip: (
        <div>
          <div className="font-semibold mb-1">Obtener casas</div>
          <div>Petición GET para obtener las casas del usuario.</div>
          {housesStep.logId && (
            <button
              className="mt-2 underline text-blue-600 text-xs"
              onClick={() => scrollToStep(housesStep.logId)}
            >Ir a la petición en la consola</button>
          )}
        </div>
      ),
    },
    {
      label: 'Detalles de la casa',
      status: houseDetailsStep.status,
      logId: houseDetailsStep.logId,
      tooltip: (
        <div>
          <div className="font-semibold mb-1">Detalles de la casa</div>
          <div>Petición GET para obtener los detalles de la casa seleccionada.</div>
          {houseDetailsStep.logId && (
            <button
              className="mt-2 underline text-blue-600 text-xs"
              onClick={() => scrollToStep(houseDetailsStep.logId)}
            >Ir a la petición en la consola</button>
          )}
        </div>
      ),
    },
  ];

  function scrollToStep(logId: string | null) {
    if (!logId) return;
    const el = document.getElementById(logId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('ring-2', 'ring-blue-400');
      setTimeout(() => {
        el.classList.remove('ring-2', 'ring-blue-400');
      }, 2000);
    }
  }

  // Efecto para detectar cuando se visualiza el código
  useEffect(() => {
    const checkCodeVisibility = () => {
      const codeElement = document.querySelector('.code-preview');
      if (codeElement && (codeElement as HTMLElement).offsetParent !== null) {
        updateWelcomeStep('visualize');
      }
    };

    // Observar cambios en el DOM
    const observer = new MutationObserver(checkCodeVisibility);
    observer.observe(document.body, { childList: true, subtree: true });

    // Verificar inicialmente
    checkCodeVisibility();

    return () => observer.disconnect();
  }, []);

  // Exponer función global para marcar el paso 'Visualiza'
  useEffect(() => {
    window.completeOnboardingVisualizeStep = () => {
      setWelcomeSteps(prev => {
        if (!prev.visualize) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
        return { ...prev, visualize: true };
      });
    };
    return () => { delete window.completeOnboardingVisualizeStep; };
  }, []);

  // Sincronizar welcomeSteps con window para el onboarding global
  useEffect(() => {
    window.welcomeSteps = welcomeSteps;
  }, [welcomeSteps]);

  // Efecto para detectar cuando se completan todos los pasos
  useEffect(() => {
    if (welcomeSteps.dragModule && welcomeSteps.customize && welcomeSteps.visualize) {
      // Esperar 2 segundos antes de ocultar el mensaje
      const timer = setTimeout(() => {
        setShowWelcome(false);
        try { localStorage.setItem('clevergy-hide-welcome', '1'); } catch {/* vacío */}
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [welcomeSteps]);

  // Añadir el CSS para la clase onboarding-highlight
  const onboardingHighlightStyle = `
  .onboarding-highlight {
    box-shadow: 0 0 0 3px #ef4444, 0 0 8px 2px #ef4444aa;
    border: 2px solid #ef4444 !important;
    border-radius: 10px !important;
    animation: onboarding-pulse 1s infinite alternate;
    z-index: 1000;
  }
  @keyframes onboarding-pulse {
    0% { box-shadow: 0 0 0 3px #ef4444, 0 0 8px 2px #ef4444aa; }
    100% { box-shadow: 0 0 0 6px #ef4444, 0 0 16px 4px #ef4444cc; }
  }
  `;
  if (typeof window !== 'undefined' && !document.getElementById('onboarding-highlight-style')) {
    const style = document.createElement('style');
    style.id = 'onboarding-highlight-style';
    style.innerHTML = onboardingHighlightStyle;
    document.head.appendChild(style);
  }

  return (
    <div className="w-96 h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        {/* Banner de bienvenida */}
        {showWelcome && (
          <div className="mb-5 bg-gradient-to-br from-blue-50 to-teal-50 border border-blue-100 rounded-xl shadow flex flex-col gap-2 p-4 relative animate-fade-in">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-lg"
              onClick={() => {
                setShowWelcome(false);
                try { localStorage.setItem('clevergy-hide-welcome', '1'); } catch {/* vacío */}
              }}
              aria-label="Cerrar bienvenida"
            >✕</button>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">✨</span>
              <span className="font-bold text-base text-teal-800">¡Bienvenido/a al Builder de Clevergy!</span>
            </div>
            {/* Stepper visual compacto y centrado, un poco más grande */}
            <div className="flex items-center justify-center w-full mb-3">
              <div className="flex items-center justify-center w-full max-w-xs gap-3 mx-auto">
                {/* Paso 1 */}
                <div className="flex flex-col items-center w-16">
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all duration-300 ${welcomeSteps.dragModule ? 'bg-[var(--clevergy-color-primary)] border-[var(--clevergy-color-primary)] text-white' : 'bg-white border-[var(--clevergy-color-primary)] text-[var(--clevergy-color-primary)]'}`}
                  >
                    {welcomeSteps.dragModule ? '✓' : '1'}
                  </div>
                  <span
                    className={`block text-center mt-1 text-xs font-medium transition-all duration-300 ${welcomeSteps.dragModule ? 'text-[var(--clevergy-color-primary)]' : 'text-gray-400'}`}
                  >Arrastra</span>
                </div>
                {/* Línea */}
                <div className={`h-0.5 w-8 rounded ${welcomeSteps.dragModule ? 'bg-[var(--clevergy-color-primary)]' : 'bg-gray-200'} transition-all duration-300`}></div>
                {/* Paso 2 */}
                <div className="flex flex-col items-center w-16">
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all duration-300 ${welcomeSteps.customize ? 'bg-[var(--clevergy-color-primary)] border-[var(--clevergy-color-primary)] text-white' : 'bg-white border-[var(--clevergy-color-primary)] text-[var(--clevergy-color-primary)]'}`}
                  >
                    {welcomeSteps.customize ? '✓' : '2'}
                  </div>
                  <span
                    className={`block text-center mt-1 text-xs font-medium transition-all duration-300 ${welcomeSteps.customize ? 'text-[var(--clevergy-color-primary)]' : 'text-gray-400'}`}
                  >Personaliza</span>
                </div>
                {/* Línea */}
                <div className={`h-0.5 w-8 rounded ${welcomeSteps.customize ? 'bg-[var(--clevergy-color-primary)]' : 'bg-gray-200'} transition-all duration-300`}></div>
                {/* Paso 3 */}
                <div className="flex flex-col items-center w-16">
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all duration-300 ${welcomeSteps.visualize ? 'bg-[var(--clevergy-color-primary)] border-[var(--clevergy-color-primary)] text-white' : 'bg-white border-[var(--clevergy-color-primary)] text-[var(--clevergy-color-primary)]'}`}
                  >
                    {welcomeSteps.visualize ? '✓' : '3'}
                  </div>
                  <span
                    className={`block text-center mt-1 text-xs font-medium transition-all duration-300 ${welcomeSteps.visualize ? 'text-[var(--clevergy-color-primary)]' : 'text-gray-400'}`}
                  >Visualiza</span>
                </div>
              </div>
            </div>
            <ol className="list-decimal list-inside text-sm text-gray-700 pl-2 space-y-1">
              <li><b>Arrastra el módulo de precios de energía</b> desde <span className="bg-blue-100 text-blue-700 rounded px-1">Sin autenticación</span> al área central.</li>
              <li><b>Personaliza tu apariencia</b> en la sección destacada arriba.</li>
              <li><b>Visualiza y copia el código</b> generado y revisa las peticiones API en la consola.</li>
            </ol>
          </div>
        )}
        {/* 2. Personaliza tu apariencia */}
        <div className="mb-6">
      <div className="p-4 border-b border-gray-100 relative">
        <div className="flex items-center justify-between cursor-pointer select-none" onClick={() => setShowExamples(v => !v)}>
          <div className="flex items-center gap-2">
            <Paintbrush size={18} className="text-blue-500" />
            <span className="font-bold text-sm text-gray-800">Personaliza tu apariencia</span>
          </div>
          <span className="text-gray-400 text-lg">{showExamples ? '▲' : '▼'}</span>
        </div>
        {/* Dropdown de estilos de ejemplo */}
        {showExamples && savedStyles.length > 0 && (
          <div className="w-full mt-3 flex flex-col gap-1 animate-fade-in">
            <div className="text-xs text-gray-500 mb-1">Estilos de ejemplo:</div>
            {savedStyles.map((s, idx) => {
              let icon = null;
              if (s.name === 'Cangrejo Rosa') icon = <span role="img" aria-label="cangrejo" className="text-xl">🦀</span>;
              else if (s.name === 'Gas Naranja') icon = <Flame className="text-orange-500" size={18} />;
              else if (s.name === 'Clevergy') icon = <img src={import.meta.env.BASE_URL + "favicon_clevergy.png"} alt="Clevergy" className="w-5 h-5 inline-block align-middle rounded" />;
              else icon = <Award className="text-gray-400" size={18} />;
              const isActive = JSON.stringify(stylesVars) === JSON.stringify(s.vars);
              const isEditable = !['Cangrejo Rosa', 'Gas Naranja', 'Clevergy'].includes(s.name) ? true : false;
              const isDefault = ['Cangrejo Rosa', 'Gas Naranja', 'Clevergy'].includes(s.name);
              const highlightCrab = welcomeSteps.dragModule && !welcomeSteps.customize && s.name === 'Cangrejo Rosa';
              return (
                <div key={s.name} className={`flex items-center gap-2 w-full group relative${highlightCrab ? ' onboarding-highlight' : ''}`}>
                  <span className="text-xs text-gray-400 w-4 text-right">{idx + 1}.</span>
                  <button
                    className={`flex-1 text-left px-2 py-1 text-xs rounded-lg border border-gray-200 transition-colors flex items-center gap-2 ${isActive ? 'bg-gray-200 font-bold text-blue-700' : 'bg-white hover:bg-blue-50'}`}
                    onClick={() => handleLoadStyle(s.vars, s.emoji)}
                    title="Cargar estilo"
                    style={{ outline: 'none', display: 'flex', alignItems: 'center', width: '100%' }}
                  >
                    <span className="mr-2 flex items-center">{s.emoji ? <span className="text-xl">{s.emoji}</span> : icon}</span>
                    <span className="truncate flex-1">{s.name}</span>
                    {/* Botón Ver estilo solo visible en hover, en la misma caja */}
                    <span
                      className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition ml-auto cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100"
                      style={{ fontWeight: 500 }}
                      title="Abrir en la vista lateral"
                      onClick={e => { e.stopPropagation(); setStylesVars({ ...s.vars }); setStyleName(s.name); setShowStyles(true); }}
                      tabIndex={0}
                      role="button"
                      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { setStylesVars({ ...s.vars }); setStyleName(s.name); setShowStyles(true); } }}
                    >
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2" fill="#e5e7eb" stroke="#94a3b8" strokeWidth="1.5"/><rect x="5.5" y="6.5" width="5" height="11" rx="1" fill="#fff" stroke="#64748b" strokeWidth="1.2"/><rect x="12.5" y="6.5" width="6" height="11" rx="1" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.2"/></svg>
                      <span className="hidden sm:inline">Ver estilo</span>
                    </span>
                  </button>
                </div>
              );
            })}
            <div className="flex w-full justify-start mt-3">
          <button
                className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200 transition-all focus:ring-2 focus:ring-blue-300"
                onClick={() => { setStyleName(''); setStylesVars({ ...defaultStyles }); setShowStyles(true); }}
              >
                <span className="text-base font-bold">+</span> Nuevo estilo
          </button>
      </div>
        </div>
        )}
        {showStyles && (
          <div className="fixed top-0 left-80 z-50 w-80 h-full bg-white shadow-2xl border-l border-gray-200 p-6 animate-fade-in flex flex-col gap-6"
            style={{ minHeight: '100vh', maxHeight: '100vh', overflowY: 'auto' }}
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-semibold text-gray-800">Personaliza apariencia</h2>
              <div className="flex gap-2">
                {!["Clevergy", "Cangrejo Rosa", "Gas Naranja"].includes(styleName) && (
                  <button
                    className="text-red-500 hover:text-red-700 text-xs border border-red-200 rounded px-2 py-1 font-medium"
                    onClick={() => { handleDeleteStyle(styleName); setShowStyles(false); }}
                    title="Eliminar estilo"
                  >
                    Eliminar
                  </button>
                )}
                <button
                  className="text-gray-400 hover:text-gray-700 text-lg"
                  onClick={() => setShowStyles(false)}
                  aria-label="Cerrar personalización"
                >
                  ✕
                </button>
              </div>
            </div>
            {/* Tipografía */}
            <div className="space-y-3">
            <div className="flex items-center gap-2">
                <span className="text-lg">📝</span>
                <label className="text-xs font-medium text-gray-700">Familia de fuente</label>
                <Tooltip text="Fuente global para todos los módulos. Debe estar cargada en la web." />
              </div>
              <select
                className="w-full border rounded-lg px-3 py-2 text-sm"
                value={stylesVars['--clevergy-font-family']}
                onChange={e => setStylesVars(s => ({ ...s, '--clevergy-font-family': e.target.value }))}
              >
                <optgroup label="Sans-serif">
                  <option value="Inter, system-ui, sans-serif">Inter</option>
                  <option value="Roboto, system-ui, sans-serif">Roboto</option>
                  <option value="Open Sans, system-ui, sans-serif">Open Sans</option>
                  <option value="Montserrat, system-ui, sans-serif">Montserrat</option>
                  <option value="Poppins, system-ui, sans-serif">Poppins</option>
                  <option value="Nunito, system-ui, sans-serif">Nunito</option>
                </optgroup>
                <optgroup label="Serif">
                  <option value="Merriweather, Georgia, serif">Merriweather</option>
                  <option value="Playfair Display, Georgia, serif">Playfair Display</option>
                  <option value="Source Serif Pro, Georgia, serif">Source Serif Pro</option>
                </optgroup>
                <optgroup label="Monospace">
                  <option value="JetBrains Mono, monospace">JetBrains Mono</option>
                  <option value="Fira Code, monospace">Fira Code</option>
                  <option value="Source Code Pro, monospace">Source Code Pro</option>
                </optgroup>
              </select>
            </div>
            {/* Colores comunes */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">🎨</span>
                <label className="text-xs font-medium text-gray-700">Colores comunes</label>
              </div>
              <div className="grid grid-cols-2 gap-4">
            {[
                  ['--clevergy-color-primary', 'Color primario', 'Color principal de la marca y botones.'],
                  ['--clevergy-color-secondary', 'Color secundario', 'Color secundario de la marca.'],
                  ['--clevergy-color-text', 'Color texto', 'Color principal del texto.'],
                  ['--clevergy-color-subtext', 'Color subtexto', 'Color para textos secundarios o descripciones.'],
                  ['--clevergy-color-unselected', 'Color unselected', 'Color para elementos no seleccionados.'],
                  ['--clevergy-color-border', 'Color borde', 'Color de los bordes de los módulos.'],
                ].map(([key, label, tooltip]) => (
                  <div key={key} className="flex flex-col gap-2">
                    <label className="text-xs text-gray-500 flex items-center gap-1">{label}<Tooltip text={tooltip} /></label>
                    <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={stylesVars[key]}
                  onChange={e => setStylesVars(s => ({ ...s, [key]: e.target.value }))}
                        className="w-10 h-10 rounded-lg border-2 border-gray-200 cursor-pointer shadow"
                        style={{ minWidth: 40, minHeight: 40, width: '80px' }}
                      />
                      <input
                        type="text"
                        value={stylesVars[key]}
                        onChange={e => setStylesVars(s => ({ ...s, [key]: e.target.value }))}
                        className="text-xs border rounded-lg px-2 py-1.5 bg-gray-50"
                        style={{ width: '80px' }}
                        placeholder="Ej: #e57200"
                      />
                    </div>
              </div>
            ))}
              </div>
            </div>
            {/* Header módulo */}
            <div className="space-y-3">
            <div className="flex items-center gap-2">
                <span className="text-lg">📌</span>
                <label className="text-xs font-medium text-gray-700">Header del módulo</label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  ['--clevergy-module-header-title-color', 'Título', 'Color del título del header del módulo.'],
                  ['--clevergy-module-header-action-color', 'Acción', 'Color de los iconos o acciones del header.'],
                ].map(([key, label, tooltip]) => (
                  <div key={key} className="flex flex-col gap-2">
                    <label className="text-xs text-gray-500 flex items-center gap-1">{label}<Tooltip text={tooltip} /></label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={stylesVars[key]}
                        onChange={e => setStylesVars(s => ({ ...s, [key]: e.target.value }))}
                        className="w-10 h-10 rounded-lg border-2 border-gray-200 cursor-pointer shadow"
                        style={{ minWidth: 40, minHeight: 40, width: '80px' }}
                      />
              <input
                type="text"
                        value={stylesVars[key]}
                        onChange={e => setStylesVars(s => ({ ...s, [key]: e.target.value }))}
                        className="text-xs border rounded-lg px-2 py-1.5 bg-gray-50"
                        style={{ width: '80px' }}
                        placeholder="Ej: #004571"
              />
            </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Contenedor del módulo */}
            <div className="space-y-3">
            <div className="flex items-center gap-2">
                <span className="text-lg">📦</span>
                <label className="text-xs font-medium text-gray-700">Contenedor del módulo</label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  ['--clevergy-module-container-background', 'Fondo', 'Fondo del contenedor del módulo. Puede ser color, gradiente o none.'],
                  ['--clevergy-module-container-border', 'Borde', 'Borde del contenedor. Ejemplo: 1px solid #d9d9d9 o none.'],
                  ['--clevergy-module-container-border-radius', 'Radio del borde', 'Redondez de las esquinas. Ejemplo: 8px o none.'],
                  ['--clevergy-module-container-box-shadow', 'Sombra', 'Sombra del contenedor. Ejemplo: 0 2px 8px rgba(0,0,0,0.1) o none.'],
                  ['--clevergy-module-container-padding', 'Padding', 'Espaciado interno. Ejemplo: 16px o none.'],
                  ['--clevergy-module-container-margin', 'Margen', 'Espaciado externo. Ejemplo: 16px o none.'],
                ].map(([key, label, tooltip]) => (
                  <div key={key} className="flex flex-col gap-2">
                    <label className="text-xs text-gray-500 flex items-center gap-1">{label}<Tooltip text={tooltip} /></label>
              <input
                type="text"
                      value={stylesVars[key]}
                          onChange={e => setStylesVars(s => ({ ...s, [key]: e.target.value }))}
                      className="w-full text-xs border rounded-lg px-2 py-1"
                          placeholder={key.includes('radius') || key.includes('padding') || key.includes('margin') ? '8px' : ''}
              />
            </div>
                ))}
              </div>
            </div>
            {/* Botones */}
            <div className="space-y-3">
            <div className="flex items-center gap-2">
                <span className="text-lg">🔘</span>
                <label className="text-xs font-medium text-gray-700">Botones</label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  ['--clevergy-button-color', 'Color botón', 'Color principal del botón.'],
                  ['--clevergy-button-contrast-color', 'Contraste', 'Color del texto o fondo de contraste del botón.'],
                  ['--clevergy-button-border-radius', 'Radio del botón', 'Redondez de los botones. Ejemplo: 8px.'],
                ].map(([key, label, tooltip]) => (
                  <div key={key} className="flex flex-col gap-2">
                    <label className="text-xs text-gray-500 flex items-center gap-1">{label}<Tooltip text={tooltip} /></label>
              <input
                type="text"
                      value={stylesVars[key]}
                      onChange={e => setStylesVars(s => ({ ...s, [key]: e.target.value }))}
                      className="w-full text-xs border rounded-lg px-2 py-1"
                      placeholder={key.includes('color') ? '#e57200' : '8px'}
              />
            </div>
                ))}
              </div>
            </div>
                {/* Guardar estilo si hay cambios */}
            {JSON.stringify(stylesVars) !== JSON.stringify(defaultStyles) && (
              <div className="flex w-full gap-2 mt-2">
              <div className="flex items-center gap-2 w-full">
                <span
                  className="cursor-pointer select-none text-lg"
                  style={{ minWidth: 24 }}
                  title="Editar emoji"
                  onClick={() => setEditingEmoji(true)}
                >
                  {emoji || "🦄"}
                </span>
                <input
                  type="text"
                  className="flex-1 text-xs border rounded-lg px-2 py-1 bg-gray-50"
                  placeholder="Nombre del estilo (ej: Clevergy, Octopus...)"
                  value={styleName}
                  onChange={e => setStyleName(e.target.value)}
                  maxLength={32}
                  style={{ minWidth: 0 }}
                />
                {editingEmoji && (
                  <input
                    type="text"
                    className="w-8 text-center text-lg border rounded-lg px-1 py-0.5 bg-gray-50 ml-1"
                    maxLength={2}
                    value={emoji}
                    autoFocus
                    onBlur={() => setEditingEmoji(false)}
                    onChange={e => setEmoji(e.target.value)}
                    style={{ minWidth: 24 }}
                  />
                )}
              </div>
                <button
                  className="px-3 py-1.5 text-xs font-medium text-green-700 bg-green-50 rounded-lg hover:bg-green-100 transition-all active:scale-95 active:shadow-inner focus:ring-2 focus:ring-green-300"
                  onClick={handleSaveStyle}
                >
                  Guardar
                </button>
            </div>
            )}
            {feedback && (
              <div className="w-full flex justify-center mt-2">
                <span className="text-xs text-green-600 font-semibold animate-pulse bg-green-50 rounded px-3 py-1 shadow">{feedback}</span>
              </div>
            )}
            {!["Clevergy", "Cangrejo Rosa", "Gas Naranja"].includes(styleName) && (
              <div className="flex flex-col gap-2 mt-6 border-t pt-4">
              <div className="flex items-center gap-2 w-full">
                <span
                  className="cursor-pointer select-none text-lg"
                  style={{ minWidth: 24 }}
                  title="Editar emoji"
                  onClick={() => setEditingEmoji(true)}
                >
                  {emoji || "🦄"}
                </span>
                <input
                  type="text"
                  className="flex-1 text-xs border rounded-lg px-2 py-1 bg-gray-50"
                  placeholder="Nombre del estilo"
                  value={styleName}
                  onChange={e => setStyleName(e.target.value)}
                  maxLength={32}
                  style={{ minWidth: 0 }}
                />
                {editingEmoji && (
                  <input
                    type="text"
                    className="w-8 text-center text-lg border rounded-lg px-1 py-0.5 bg-gray-50 ml-1"
                    maxLength={2}
                    value={emoji}
                    autoFocus
                    onBlur={() => setEditingEmoji(false)}
                    onChange={e => setEmoji(e.target.value)}
                    style={{ minWidth: 24 }}
                  />
                )}
              </div>
            <button
                  className="px-4 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all active:scale-95 active:shadow-inner focus:ring-2 focus:ring-blue-300"
                  style={{ minWidth: 80 }}
                  onClick={handleSaveStyle}
                >
                  Guardar estilo
            </button>
              </div>
            )}
        </div>
        )}
      </div>
        </div>
        {/* 2. Sin autenticación */}
        <div className="mb-6">
          <details className="border rounded-lg" open>
            <summary className="px-4 py-3 text-base font-semibold cursor-pointer bg-blue-100 border-b rounded-t-lg flex items-center gap-2 select-none">
              <span role="img" aria-label="puzzle">🌐</span>
              <span>Sin autenticación ({modules.filter(m => !m.auth).length})</span>
              <svg className="ml-2 transition-transform group-open:rotate-90" width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M8 10l4 4 4-4" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </summary>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3 text-blue-700 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 text-xs">
                <Info size={16} className="text-blue-400" />
                <span>Estos módulos no requieren autenticación. Puedes probarlos directamente.</span>
              </div>
              <div>
                {Object.entries(groupedModules).map(([cat, mods]) => {
                  const publicMods = Array.isArray(mods) ? mods.filter(m => !m.auth) : [];
                  if (publicMods.length === 0) return null;
                  return (
                    <div key={cat} className="mb-2">
                      <div className="text-xs font-bold text-gray-700 mb-1">{cat}</div>
                      <div className="space-y-1">
                        {publicMods.map(module => {
                          const attrs = extractAttrs(module.htmlTag);
                          const showCustom = customAttrs[module.id]?.show || false;
                          const highlightEnergy = !welcomeSteps.dragModule && module.id === 'energy-prices';
                          return (
                            <div
                              key={module.id}
                              className={`relative bg-white rounded-lg border border-gray-100 shadow-sm p-2 group cursor-grab hover:shadow-md transition-shadow flex flex-col gap-1${highlightEnergy ? ' onboarding-highlight' : ''}`}
                              draggable
                              onDragStart={e => handleDragStart(e, module)}
                              style={{ marginBottom: 4 }}
                            >
                              <div className="flex items-center justify-between w-full gap-2">
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-gray-900 text-xs truncate flex items-center gap-1">{module.name} <Tooltip text={module.description} /></h4>
                                </div>
                                <button
                                  className="text-xs text-blue-600 hover:bg-blue-50 border border-blue-100 rounded px-2 py-1 font-medium whitespace-nowrap ml-2"
                                  onClick={e => {
                                    e.stopPropagation();
                                    setCustomAttrs(prev => ({
                                      ...prev,
                                      [module.id]: { ...prev[module.id], show: !showCustom }
                                    }));
                                  }}
                                  type="button"
                                >
                                  {showCustom ? 'Ocultar' : 'Personalizar'}
                                </button>
                              </div>
                              {showCustom && (
                                <div className="mt-2 space-y-2">
                                  {Object.entries(attrs).map(([attr, val]) => {
                                    // Determinar el tipo de input basado en el atributo y su valor
                                    const isBoolean = val === 'true' || val === 'false';
                                    const isEnergyPricesType = attr === 'data-energy-prices-type';
                                    const isLanguage = attr === 'data-language';
                                    const isUnit = attr === 'data-unit';
                                    
                                    return (
                                      <div key={attr} className="flex flex-col gap-1">
                                        <label className="text-xs text-gray-500 flex items-center gap-1">
                                          {attr.replace('data-', '').replace(/-/g, ' ')}
                                          <Tooltip text={`Valor actual: ${String(val)}`} />
                                        </label>
                                        
                                        {isBoolean ? (
                                          <div className="flex items-center gap-2">
                                            <input
                                              type="checkbox"
                                              checked={customAttrs[module.id]?.[attr] === 'true' || (!customAttrs[module.id]?.[attr] && val === 'true')}
                                              onChange={e => {
                                                setCustomAttrs(prev => ({
                                                  ...prev,
                                                  [module.id]: { ...prev[module.id], [attr]: e.target.checked ? 'true' : 'false' }
                                                }));
                                              }}
                                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                              disabled={false}
                                            />
                                            <span className="text-xs text-gray-600">Activar</span>
                                          </div>
                                        ) : isEnergyPricesType ? (
                                          <select
                                            value={customAttrs[module.id]?.[attr] || val}
                                            onChange={e => {
                                              setCustomAttrs(prev => ({
                                                ...prev,
                                                [module.id]: { ...prev[module.id], [attr]: e.target.value }
                                              }));
                                            }}
                                            className="w-full text-xs border rounded-lg px-2 py-1 bg-gray-50"
                                          >
                                            <option value="PVPC">PVPC</option>
                                            <option value="OMIE">OMIE</option>
                                          </select>
                                        ) : isLanguage ? (
                                          <select
                                            value={customAttrs[module.id]?.[attr] || val || ''}
                                            onChange={e => {
                                              setCustomAttrs(prev => ({
                                                ...prev,
                                                [module.id]: { ...prev[module.id], [attr]: e.target.value }
                                              }));
                                            }}
                                            className="w-full text-xs border rounded-lg px-2 py-1 bg-gray-50"
                                          >
                                            <option value="" disabled>Elige idioma...</option>
                                            <option value="es-ES">es-ES</option>
                                            <option value="ca-ES">ca-ES</option>
                                            <option value="gl-ES">gl-ES</option>
                                          </select>
                                        ) : isUnit ? (
                                          <select
                                            value={customAttrs[module.id]?.[attr] || val || ''}
                                            onChange={e => {
                                              setCustomAttrs(prev => ({
                                                ...prev,
                                                [module.id]: { ...prev[module.id], [attr]: e.target.value }
                                              }));
                                            }}
                                            className="w-full text-xs border rounded-lg px-2 py-1 bg-gray-50"
                                          >
                                            <option value="ENERGY">ENERGY</option>
                                            <option value="CURRENCY">CURRENCY</option>
                                          </select>
                                        ) : (
                                          <input
                                            type="text"
                                            value={String(customAttrs[module.id]?.[attr] || val)}
                                            onChange={e => {
                                              setCustomAttrs(prev => ({
                                                ...prev,
                                                [module.id]: { ...prev[module.id], [attr]: e.target.value }
                                              }));
                                            }}
                                            className="w-full text-xs border rounded-lg px-2 py-1 bg-gray-50"
                                            placeholder={String(val)}
                                          />
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </details>
        </div>
        {/* 3. Con autenticación */}
        <div className="mb-6">
          <div className="mb-4 bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl border border-teal-100 shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <Lock size={18} className="text-teal-600" />
              <h3 className="font-semibold text-gray-800">Autenticación</h3>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                <div className="flex flex-wrap gap-2">
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="min-w-0 flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Ingresa tu API key"
                    autoComplete="off"
                  />
                  <button
                    onClick={fetchToken}
                    disabled={isLoading || !apiKey}
                    className="min-w-[120px] bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 transition-all duration-200 whitespace-nowrap"
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    {isLoading ? 'Buscando...' : 'Continuar'}
                  </button>
                </div>
              </div>
              {apiKey && !token && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="flex flex-wrap gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="min-w-0 flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="Ingresa el email del usuario"
                    />
                    <button
                      onClick={fetchToken}
                      disabled={isLoading || !email}
                      className="min-w-[120px] bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 transition-all duration-200 whitespace-nowrap"
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      {isLoading ? 'Buscando...' : 'Buscar casas'}
                    </button>
                  </div>
                </div>
              )}
              {/* Steppers, selector de casas y estado de la casa */}
              {houses.length > 0 && (
                <div className="mt-2">
                  {/* Stepper minimalista y secuencial con tooltips mejorados */}
                  <div className="flex flex-col items-center w-full mb-2">
                    <div className="flex items-center justify-center w-full gap-4 mb-2">
                      {/* Paso 1: Buscar userId */}
                      <ShadTooltipProvider>
                        <ShadTooltip>
                          <ShadTooltipTrigger asChild>
                            <div className="flex flex-col items-center cursor-pointer group">
                              <div className="transition-shadow group-hover:shadow-lg group-hover:scale-105 rounded-full">
                                <StepCircle status={userIdStep.status as 'pending' | 'inprogress' | 'done'} />
                              </div>
                              <span className="text-xs mt-1 group-hover:text-teal-700 transition-colors">userId</span>
                            </div>
                          </ShadTooltipTrigger>
                          <ShadTooltipContent className="max-w-xs">
                            <div className="mb-2 text-xs text-gray-700">Llamada a la API:</div>
                            <div className="flex items-center gap-2 bg-gray-100 rounded px-2 py-1 mb-2">
                              <MethodBadge method="GET" />
                              <span className="font-mono text-xs text-gray-800">https://connect.clever.gy/users?email={email}</span>
                            </div>
                            <a href="https://docs.clever.gy/connect-api/get-users" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-xs block mb-1">https://docs.clever.gy/connect-api/get-users</a>
                            {userIdStep.userId && <div className="mb-1 text-xs">userId: <span className="bg-yellow-200 px-1 rounded font-mono text-gray-900">{userIdStep.userId}</span></div>}
                            {userIdStep.logId && <a href={`#${userIdStep.logId}`} className="text-blue-600 underline text-xs" onClick={e => {e.preventDefault(); scrollToStep(userIdStep.logId);}}>Ver en consola</a>}
                          </ShadTooltipContent>
                        </ShadTooltip>
                      </ShadTooltipProvider>
                      <div className="h-0.5 w-6 bg-gray-200 rounded" />
                      {/* Paso 2: Token */}
                      <ShadTooltipProvider>
                        <ShadTooltip>
                          <ShadTooltipTrigger asChild>
                            <div className="flex flex-col items-center cursor-pointer group">
                              <div className="transition-shadow group-hover:shadow-lg group-hover:scale-105 rounded-full">
                                <StepCircle status={userIdStep.status as 'pending' | 'inprogress' | 'done'} />
                              </div>
                              <span className="text-xs mt-1 group-hover:text-teal-700 transition-colors">Token</span>
                            </div>
                          </ShadTooltipTrigger>
                          <ShadTooltipContent className="max-w-xs">
                            <div className="mb-2 text-xs text-gray-700">Llamada a la API:</div>
                            <div className="flex items-center gap-2 bg-gray-100 rounded px-2 py-1 mb-2">
                              <MethodBadge method="GET" />
                              <span className="font-mono text-xs text-gray-800">https://connect.clever.gy/auth/{userIdStep.userId}/token</span>
                            </div>
                            <a href="https://connect.clever.gy/auth/:userId/token" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-xs block mb-1">https://connect.clever.gy/auth/:userId/token</a>
                            {token && (
                              <div className="mb-1 text-xs break-all">
                                token: <span className="bg-yellow-200 px-1 rounded font-mono text-gray-900">{token.slice(0, 24)}...{token.slice(-8)}</span>
                              </div>
                            )}
                            {userIdStep.logId && <a href={`#${userIdStep.logId}`} className="text-blue-600 underline text-xs block mt-1" onClick={e => {e.preventDefault(); scrollToStep(userIdStep.logId);}}>Ver en consola</a>}
                          </ShadTooltipContent>
                        </ShadTooltip>
                      </ShadTooltipProvider>
                      <div className="h-0.5 w-6 bg-gray-200 rounded" />
                      {/* Paso 3: Casas */}
                      <ShadTooltipProvider>
                        <ShadTooltip>
                          <ShadTooltipTrigger asChild>
                            <div className="flex flex-col items-center cursor-pointer group">
                              <div className="transition-shadow group-hover:shadow-lg group-hover:scale-105 rounded-full">
                                <StepCircle status={housesStep.status as 'pending' | 'inprogress' | 'done'} />
                              </div>
                              <span className="text-xs mt-1 group-hover:text-teal-700 transition-colors">Casas</span>
                            </div>
                          </ShadTooltipTrigger>
                          <ShadTooltipContent className="max-w-xs">
                            <div className="mb-2 text-xs text-gray-700">Llamada a la API:</div>
                            <div className="flex items-center gap-2 bg-gray-100 rounded px-2 py-1 mb-2">
                              <MethodBadge method="GET" />
                              <span className="font-mono text-xs text-gray-800">https://connect.clever.gy/users/{userIdStep.userId}/supplies</span>
                            </div>
                            <a href="https://connect.clever.gy/users/:userId/supplies" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-xs block mb-1">https://connect.clever.gy/users/:userId/supplies</a>
                            {housesStep.status === 'done' && <div className="mb-1 text-xs">Casas: <span className="bg-yellow-200 px-1 rounded font-mono text-gray-900">{houses.length}</span></div>}
                            {housesStep.logId && <a href={`#${housesStep.logId}`} className="text-blue-600 underline text-xs" onClick={e => {e.preventDefault(); scrollToStep(housesStep.logId);}}>Ver en consola</a>}
                          </ShadTooltipContent>
                        </ShadTooltip>
                      </ShadTooltipProvider>
                      <div className="h-0.5 w-6 bg-gray-200 rounded" />
                      {/* Paso 4: Detalles */}
                      <ShadTooltipProvider>
                        <ShadTooltip>
                          <ShadTooltipTrigger asChild>
                            <div className="flex flex-col items-center cursor-pointer group">
                              <div className="transition-shadow group-hover:shadow-lg group-hover:scale-105 rounded-full">
                                <StepCircle status={houseDetailsStep.status as 'pending' | 'inprogress' | 'done'} />
                              </div>
                              <span className="text-xs mt-1 group-hover:text-teal-700 transition-colors">Detalles</span>
                            </div>
                          </ShadTooltipTrigger>
                          <ShadTooltipContent className="max-w-xs">
                            <div className="mb-2 text-xs text-gray-700">Llamada a la API:</div>
                            <div className="flex items-center gap-2 bg-gray-100 rounded px-2 py-1 mb-2">
                              <MethodBadge method="GET" />
                              <span className="font-mono text-xs text-gray-800">https://connect.clever.gy/houses/{selectedHouseId}/house-detail</span>
                            </div>
                            <a href={`https://connect.clever.gy/houses/${selectedHouseId}/house-detail`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-xs block mb-1">https://connect.clever.gy/houses/:houseId/house-detail</a>
                            {houseDetailsStep.status === 'done' && <div className="mb-1 text-xs">houseId: <span className="bg-yellow-200 px-1 rounded font-mono text-gray-900">{selectedHouseId}</span></div>}
                            {houseDetailsStep.logId && <a href={`#${houseDetailsStep.logId}`} className="text-blue-600 underline text-xs" onClick={e => {e.preventDefault(); scrollToStep(houseDetailsStep.logId);}}>Ver en consola</a>}
                          </ShadTooltipContent>
                        </ShadTooltip>
                      </ShadTooltipProvider>
                    </div>
                  </div>
                  {/* Selector de casas */}
                  <label className="block text-sm font-medium text-gray-700 mb-1">Selecciona una casa:</label>
                  <select
                    className="w-full border rounded-lg px-3 py-2 text-sm mb-2"
                    value={selectedHouseId}
                    onChange={e => handleSelectHouseAndGetToken(e.target.value)}
                  >
                    <option value="" disabled>Elige una casa...</option>
                    {houses.map(h => (
                      <option key={h.houseId} value={h.houseId}>{h.address || h.houseId}</option>
                    ))}
                  </select>
                  {/* Estado de la casa debajo del selector */}
                  {selectedHouseId && houseDetails[selectedHouseId] && (
                    <div className="flex justify-center mt-3 mb-2">
                      <div className="bg-white border border-gray-200 rounded-lg shadow-sm px-4 py-2 flex flex-col items-center w-full max-w-md">
                        <div className="flex items-center justify-center w-full mb-1 gap-2">
                          <span className="text-xs font-semibold text-gray-700 text-center">Estado de la casa</span>
                          <span className=""><HouseStatusIcons houseDetail={houseDetails[selectedHouseId]} onlyInfoIcon /></span>
                        </div>
                        <div className="flex justify-center w-full mt-1">
                          <HouseStatusIcons houseDetail={houseDetails[selectedHouseId]} onlyIcons />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <details className="border rounded-lg" open={privadosDropdownOpen} onToggle={e => setPrivadosDropdownOpen((e.target as HTMLDetailsElement).open)}>
            <summary className="px-4 py-3 text-base font-semibold cursor-pointer bg-green-100 border-b rounded-t-lg flex items-center gap-2 select-none">
              <span role="img" aria-label="lock">🔒</span>
              {`Con autenticación (${totalPrivateModules})`}
              <svg className="ml-2 transition-transform group-open:rotate-90" width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M8 10l4 4 4-4" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </summary>
            <div className="p-4">
              {/* Callout naranja si no hay autenticación */}
              {(!token || !selectedHouseId) && (
                <div className="flex items-center gap-2 mb-4 bg-orange-50 border border-orange-200 text-orange-800 rounded-lg px-3 py-2 text-xs font-medium">
                  <Info size={16} className="text-orange-400" />
                  <span>Estos módulos requieren autenticación. Puedes arrastrarlos y personalizarlos, pero como no hay datos de la casa seleccionada, la previsualización estará vacía.</span>
                </div>
              )}
              {/* Agrupa los módulos privados por categoría en dropdowns */}
              {Object.entries(groupedModules).map(([cat, mods]) => {
                const privateMods = Array.isArray(mods) ? mods.filter(m => m.auth) : [];
                if (privateMods.length === 0) return null;
                return (
                  <details key={cat} className="mb-3 border rounded-lg group">
                    <summary className="px-3 py-2 text-sm font-semibold cursor-pointer bg-gray-50 border-b rounded-t-lg flex items-center gap-2 select-none">
                      <span role="img" aria-label={cat}>{categoryInfo[cat]?.icon || '📦'}</span>
                      <span>{cat} ({privateMods.length})</span>
                      <svg className="ml-2 transition-transform group-open:rotate-90" width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M8 10l4 4 4-4" stroke="#4b5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </summary>
                    <div className="p-3">
                      <div className="space-y-1">
                        {privateMods.map(module => {
                          const attrs = extractAttrs(module.htmlTag);
                          const showCustom = customAttrs[module.id]?.show || false;
                          const htmlTag = module.htmlTag
                            .replace(/data-token="[^"]*"/, `data-token="${token || ''}"`)
                            .replace(/data-house-id="[^"]*"/, `data-house-id="${selectedHouseId || ''}"`);
                          return (
                            <div
                              key={module.id}
                              className={`relative bg-white rounded-lg border border-gray-100 shadow-sm p-2 group transition-shadow flex flex-col gap-1 cursor-grab hover:shadow-md`}
                              draggable={true}
                              onDragStart={e => handleDragStart(e, { ...module, htmlTag })}
                              style={{ marginBottom: 4 }}
                            >
                              <div className="flex items-center justify-between w-full gap-2">
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-gray-900 text-xs truncate flex items-center gap-1">
                                    {module.name} <Tooltip text={module.description} />
                                  </h4>
                                </div>
                                <button
                                  className="text-xs text-blue-600 hover:bg-blue-50 border border-blue-100 rounded px-2 py-1 font-medium whitespace-nowrap ml-2"
                                  onClick={e => {
                                    e.stopPropagation();
                                    setCustomAttrs(prev => ({
                                      ...prev,
                                      [module.id]: { ...prev[module.id], show: !showCustom }
                                    }));
                                  }}
                                  type="button"
                                >
                                  {showCustom ? 'Ocultar' : 'Personalizar'}
                                </button>
                              </div>
                              {showCustom && (
                                <div className="mt-2 space-y-2">
                                  {Object.entries(attrs).map(([attr, val]) => {
                                    const isBoolean = val === 'true' || val === 'false';
                                    const isUnit = attr === 'data-unit';
                                    const isLanguage = attr === 'data-language';
                                    return (
                                      <div key={attr} className="flex flex-col gap-1">
                                        <label className="text-xs text-gray-500 flex items-center gap-1">
                                          {attr.replace('data-', '').replace(/-/g, ' ')}
                                          <Tooltip text={`Valor actual: ${String(val)}`} />
                                        </label>
                                        {isBoolean ? (
                                          <div className="flex items-center gap-2">
                                            <input
                                              type="checkbox"
                                              checked={customAttrs[module.id]?.[attr] === 'true' || (!customAttrs[module.id]?.[attr] && val === 'true')}
                                              onChange={e => {
                                                setCustomAttrs(prev => ({
                                                  ...prev,
                                                  [module.id]: { ...prev[module.id], [attr]: e.target.checked ? 'true' : 'false' }
                                                }));
                                              }}
                                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                              disabled={false}
                                            />
                                            <span className="text-xs text-gray-600">Activar</span>
                                          </div>
                                        ) : isUnit ? (
                                          <select
                                            value={customAttrs[module.id]?.[attr] || val || ''}
                                            onChange={e => {
                                              setCustomAttrs(prev => ({
                                                ...prev,
                                                [module.id]: { ...prev[module.id], [attr]: e.target.value }
                                              }));
                                            }}
                                            className="w-full text-xs border rounded-lg px-2 py-1 bg-gray-50"
                                            disabled={false}
                                          >
                                            <option value="ENERGY">ENERGY</option>
                                            <option value="CURRENCY">CURRENCY</option>
                                          </select>
                                        ) : isLanguage ? (
                                          <select
                                            value={customAttrs[module.id]?.[attr] || val || ''}
                                            onChange={e => {
                                              setCustomAttrs(prev => ({
                                                ...prev,
                                                [module.id]: { ...prev[module.id], [attr]: e.target.value }
                                              }));
                                            }}
                                            className="w-full text-xs border rounded-lg px-2 py-1 bg-gray-50"
                                            disabled={false}
                                          >
                                            <option value="" disabled>Elige idioma...</option>
                                            <option value="es-ES">es-ES</option>
                                            <option value="ca-ES">ca-ES</option>
                                            <option value="gl-ES">gl-ES</option>
                                          </select>
                                        ) : (
                                          <input
                                            type="text"
                                            value={String(customAttrs[module.id]?.[attr] || val)}
                                            onChange={e => {
                                              setCustomAttrs(prev => ({
                                                ...prev,
                                                [module.id]: { ...prev[module.id], [attr]: e.target.value }
                                              }));
                                            }}
                                            className="w-full text-xs border rounded-lg px-2 py-1 bg-gray-50"
                                            placeholder={String(val)}
                                            disabled={false}
                                          />
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </details>
                );
              })}
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

export default ModuleSidebar;
